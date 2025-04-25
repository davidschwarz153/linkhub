import { useState, useEffect } from "react";
import {
  Link,
  getLinks,
  addLink,
  updateLink,
  deleteLink,
} from "../lib/supabase";

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [location, setLocation] = useState<string>(() => {
    return localStorage.getItem("selectedLocation") || "FRA7";
  });
  const [isLoading, setIsLoading] = useState(false);

  // Links von Supabase laden
  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      try {
        const data = await getLinks();
        setLinks(data);
      } catch (error) {
        console.error("Fehler beim Laden der Links:", error);
      }
      setIsLoading(false);
    };

    fetchLinks();
  }, []);

  // Standort im localStorage speichern
  useEffect(() => {
    localStorage.setItem("selectedLocation", location);
  }, [location]);

  const addNewLink = async (
    newLink: Omit<Link, "id" | "created_at" | "updated_at">
  ) => {
    setIsLoading(true);
    try {
      const savedLink = await addLink(newLink);
      if (savedLink) {
        setLinks([...links, savedLink]);
      }
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Links:", error);
    }
    setIsLoading(false);
  };

  const editExistingLink = async (editedLink: Link) => {
    setIsLoading(true);
    try {
      const updatedLink = await updateLink(editedLink.id, {
        name: editedLink.name,
        url: editedLink.url,
        category: editedLink.category,
      });

      if (updatedLink) {
        setLinks(
          links.map((link) => (link.id === updatedLink.id ? updatedLink : link))
        );
      }
    } catch (error) {
      console.error("Fehler beim Bearbeiten des Links:", error);
    }
    setIsLoading(false);
  };

  const removeLink = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await deleteLink(id);
      if (success) {
        setLinks(links.filter((link) => link.id !== id));
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Links:", error);
    }
    setIsLoading(false);
  };

  const openAllLinks = () => {
    links.forEach((link) => {
      const url = link.url.replace(/FRA7|fra7/g, location);
      window.open(url, "_blank");
    });
  };

  return {
    links,
    setLinks,
    location,
    setLocation,
    addLink: addNewLink,
    editLink: editExistingLink,
    deleteLink: removeLink,
    openAllLinks,
    isLoading,
  };
};
