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

  // Links im localStorage speichern
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  // Standort im localStorage speichern
  useEffect(() => {
    localStorage.setItem("selectedLocation", location);
  }, [location]);

  const addLink = (newLink: Omit<Link, "_id">) => {
    const linkWithId = {
      ...newLink,
      _id: Date.now().toString(),
    };
    setLinks([...links, linkWithId]);
  };

  const editLink = (editedLink: Link) => {
    setLinks(
      links.map((link) => (link._id === editedLink._id ? editedLink : link))
    );
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link._id !== id));
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
  };
};
