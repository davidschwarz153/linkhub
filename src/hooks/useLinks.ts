import { useState, useEffect } from "react";
import { api, Link } from "../services/api";

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [location, setLocation] = useState<string>(() => {
    return localStorage.getItem("selectedLocation") || "FRA7";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Links vom Server laden
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const fetchedLinks = await api.getLinks();
        setLinks(fetchedLinks);
      } catch (err) {
        setError("Fehler beim Laden der Links");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Standort im localStorage speichern
  useEffect(() => {
    localStorage.setItem("selectedLocation", location);
  }, [location]);

  const openAllLinks = () => {
    setIsLoading(true);
    links.forEach((link) => {
      const url = link.url.replace(/FRA7|fra7/g, location);
      window.open(url, "_blank");
    });
    setIsLoading(false);
  };

  const addLink = async (newLink: Omit<Link, "_id">) => {
    try {
      setIsLoading(true);
      const savedLink = await api.addLink(newLink);
      setLinks([...links, savedLink]);
    } catch (err) {
      setError("Fehler beim Hinzufügen des Links");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const editLink = async (editedLink: Link) => {
    try {
      setIsLoading(true);
      const updatedLink = await api.updateLink(editedLink._id, editedLink);
      setLinks(
        links.map((link) => (link._id === updatedLink._id ? updatedLink : link))
      );
    } catch (err) {
      setError("Fehler beim Aktualisieren des Links");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      setIsLoading(true);
      await api.deleteLink(id);
      setLinks(links.filter((link) => link._id !== id));
    } catch (err) {
      setError("Fehler beim Löschen des Links");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    links,
    setLinks,
    location,
    setLocation,
    addLink,
    editLink,
    deleteLink,
    openAllLinks,
    isLoading,
    error,
  };
};
