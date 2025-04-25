import { createClient } from "@supabase/supabase-js";

// Supabase-Konfiguration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Supabase-Client erstellen
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typen für die Links-Tabelle
export type Link = {
  id: string;
  name: string;
  url: string;
  category: string;
  created_at: string;
  updated_at: string;
};

// Funktionen für CRUD-Operationen
export const getLinks = async (): Promise<Link[]> => {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .order("category", { ascending: true });

  if (error) {
    console.error("Fehler beim Laden der Links:", error);
    return [];
  }

  return data || [];
};

export const addLink = async (
  link: Omit<Link, "id" | "created_at" | "updated_at">
): Promise<Link | null> => {
  const { data, error } = await supabase
    .from("links")
    .insert([link])
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Hinzufügen des Links:", error);
    return null;
  }

  return data;
};

export const updateLink = async (
  id: string,
  link: Partial<Link>
): Promise<Link | null> => {
  const { data, error } = await supabase
    .from("links")
    .update(link)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Aktualisieren des Links:", error);
    return null;
  }

  return data;
};

export const deleteLink = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("links").delete().eq("id", id);

  if (error) {
    console.error("Fehler beim Löschen des Links:", error);
    return false;
  }

  return true;
};
