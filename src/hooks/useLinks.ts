import { useState, useEffect } from "react";
import { Link } from "../types";

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem("links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  const [location, setLocation] = useState<string>(() => {
    return localStorage.getItem("selectedLocation") || "FRA7";
  });

  const [isLoading, setIsLoading] = useState(false);

  // Links im localStorage speichern
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  // Standort im localStorage speichern
  useEffect(() => {
    localStorage.setItem("selectedLocation", location);
  }, [location]);

  const addLink = (newLink: Omit<Link, "_id">) => {
    setIsLoading(true);
    const linkWithId = {
      ...newLink,
      _id: Date.now().toString(),
    };
    setLinks([...links, linkWithId]);
    setIsLoading(false);
  };

  const editLink = (editedLink: Link) => {
    setIsLoading(true);
    setLinks(
      links.map((link) => (link._id === editedLink._id ? editedLink : link))
    );
    setIsLoading(false);
  };

  const deleteLink = (id: string) => {
    setIsLoading(true);
    setLinks(links.filter((link) => link._id !== id));
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
