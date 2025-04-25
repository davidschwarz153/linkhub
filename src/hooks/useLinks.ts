import { useState, useEffect } from "react";
import { Link } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [location, setLocation] = useState<string>(() => {
    return localStorage.getItem("selectedLocation") || "FRA7";
  });
  const [isLoading, setIsLoading] = useState(false);

  // Links vom Backend laden
  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/links`);
        const data = await response.json();
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

  const addLink = async (newLink: Omit<Link, "_id">) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newLink,
          _id: Date.now().toString(),
        }),
      });
      const savedLink = await response.json();
      setLinks([...links, savedLink]);
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Links:", error);
    }
    setIsLoading(false);
  };

  const editLink = async (editedLink: Link) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/links/${editedLink._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedLink),
      });
      const updatedLink = await response.json();
      setLinks(
        links.map((link) => (link._id === updatedLink._id ? updatedLink : link))
      );
    } catch (error) {
      console.error("Fehler beim Bearbeiten des Links:", error);
    }
    setIsLoading(false);
  };

  const deleteLink = async (id: string) => {
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/links/${id}`, {
        method: "DELETE",
      });
      setLinks(links.filter((link) => link._id !== id));
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
    addLink,
    editLink,
    deleteLink,
    openAllLinks,
    isLoading,
  };
};
