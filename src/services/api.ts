import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface Link {
  _id: string;
  name: string;
  url: string;
  category: "link" | "tool";
}

export const api = {
  getLinks: async (): Promise<Link[]> => {
    try {
      const response = await axios.get(`${API_URL}/links`);
      return response.data;
    } catch (error) {
      console.error("Error fetching links:", error);
      return [];
    }
  },

  addLink: async (link: Omit<Link, "_id">): Promise<Link> => {
    const response = await axios.post(`${API_URL}/links`, link);
    return response.data;
  },

  updateLink: async (id: string, link: Partial<Link>): Promise<Link> => {
    const response = await axios.put(`${API_URL}/links/${id}`, link);
    return response.data;
  },

  deleteLink: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/links/${id}`);
  },
};
