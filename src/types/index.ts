export interface Link {
  _id: string;
  name: string;
  url: string;
  category: "link" | "tool";
}

export interface Location {
  group: string;
  options: string[];
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface LinkHubProps {
  searchQuery: string;
}

export interface BackgroundVideoProps {
  className?: string;
}
