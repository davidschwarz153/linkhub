import { Link } from "../types";

export const getSavedLinks = (): Link[] => {
  const savedLinks = localStorage.getItem("adminLinks");
  return savedLinks ? JSON.parse(savedLinks) : [];
};

export const saveLinks = (links: Link[]): void => {
  if (links.length > 0) {
    localStorage.setItem("adminLinks", JSON.stringify(links));
  }
};

export const getSavedLocation = (): string => {
  return localStorage.getItem("userLocation") || "FRA7";
};

export const saveLocation = (location: string): void => {
  localStorage.setItem("userLocation", location);
};

export const replaceLocationInUrl = (url: string, location: string): string => {
  return url.replace(/FRA7|fra7/g, location.toUpperCase());
};
