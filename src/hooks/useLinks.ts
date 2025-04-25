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

  const openAllLinks = () => {
    setIsLoading(true);
    links.forEach((link) => {
      const url = link.url.replace(/FRA7|fra7/g, location);
      window.open(url, "_blank");
    });
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem("selectedLocation", location);
  }, [location]);

  const addLink = (newLink: Omit<Link, "id">) => {
    const linkWithId = {
      ...newLink,
      id: Date.now().toString(),
    };
    setLinks([...links, linkWithId]);
  };

  const editLink = (editedLink: Link) => {
    setLinks(
      links.map((link) => (link.id === editedLink.id ? editedLink : link))
    );
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
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
