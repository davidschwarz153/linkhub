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
  const [error, setError] = useState<string | null>(null);

  // Links von Supabase laden
  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Lade Links von Supabase...");
        const data = await getLinks();
        console.log("Geladene Links:", data);
        setLinks(data);
      } catch (error) {
        console.error("Fehler beim Laden der Links:", error);
        setError(error instanceof Error ? error.message : "Unbekannter Fehler");
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
    setError(null);
    try {
      console.log("Füge neuen Link hinzu:", newLink);
      const savedLink = await addLink(newLink);
      console.log("Gespeicherter Link:", savedLink);
      if (savedLink) {
        setLinks([...links, savedLink]);
      }
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Links:", error);
      setError(error instanceof Error ? error.message : "Unbekannter Fehler");
    }
    setIsLoading(false);
  };

  const editExistingLink = async (editedLink: Link) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Bearbeite Link:", editedLink);
      const updatedLink = await updateLink(editedLink.id, {
        name: editedLink.name,
        url: editedLink.url,
        category: editedLink.category,
      });
      console.log("Aktualisierter Link:", updatedLink);

      if (updatedLink) {
        setLinks(
          links.map((link) => (link.id === updatedLink.id ? updatedLink : link))
        );
      }
    } catch (error) {
      console.error("Fehler beim Bearbeiten des Links:", error);
      setError(error instanceof Error ? error.message : "Unbekannter Fehler");
    }
    setIsLoading(false);
  };

  const removeLink = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Lösche Link mit ID:", id);
      const success = await deleteLink(id);
      console.log("Löschung erfolgreich:", success);
      if (success) {
        setLinks(links.filter((link) => link.id !== id));
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Links:", error);
      setError(error instanceof Error ? error.message : "Unbekannter Fehler");
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
    error,
  };
};
