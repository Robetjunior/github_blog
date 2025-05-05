
import { Issue } from "../services/github";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PostCardProps {
  post: Issue;
}

export function PostCard({ post }: PostCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);
  
  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Link to={`/post/${post.number}`}>
      <div 
        ref={cardRef} 
        className="bg-blog-post rounded-lg p-8 h-full border-2 border-transparent hover:border-blog-border transition-all cursor-pointer"
      >
        <div className="flex justify-between mb-5">
          <h3 className="text-blog-title text-xl font-bold flex-1 mr-4">{post.title}</h3>
          <span className="text-blog-span text-sm whitespace-nowrap">{formattedDate}</span>
        </div>
        <p className="text-blog-text line-clamp-4">
          {isVisible ? post.body : <Skeleton className="h-16 w-full" />}
        </p>
      </div>
    </Link>
  );
}
