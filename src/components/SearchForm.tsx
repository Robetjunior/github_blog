
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

interface SearchFormProps {
  postsCount: number;
  onSearch: (query: string) => void;
}

export function SearchForm({ postsCount, onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between mb-3">
        <h3 className="text-blog-subtitle text-lg font-bold">Publicações</h3>
        <span className="text-blog-span text-sm">{postsCount} publicações</span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Buscar conteúdo"
          className="bg-blog-input text-blog-text border-blog-border placeholder:text-blog-label"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
