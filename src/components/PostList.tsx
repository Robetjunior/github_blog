
import { useEffect, useState } from "react";
import { Issue, fetchIssues } from "../services/github";
import { SearchForm } from "./SearchForm";
import { PostCard } from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";

export function PostList() {
  const [posts, setPosts] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  // Use a ref instead of useInView hook directly
  const observerRef = (node: HTMLDivElement) => {
    if (!node) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(node);
    return () => observer.disconnect();
  };

  async function loadPosts(query: string = "") {
    setIsLoading(true);
    try {
      const response = await fetchIssues(query);
      setPosts(response.items);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isVisible) {
      loadPosts();
    }
  }, [isVisible]);

  function handleSearch(query: string) {
    setSearchQuery(query);
    loadPosts(query);
  }

  return (
    <div className="mb-10" ref={observerRef}>
      <SearchForm 
        postsCount={posts.length} 
        onSearch={handleSearch} 
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-blog-subtitle">
            {searchQuery 
              ? `Nenhum resultado encontrado para "${searchQuery}"` 
              : "Nenhuma publicação encontrada"}
          </p>
        </div>
      )}
    </div>
  );
}
