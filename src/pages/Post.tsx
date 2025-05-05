
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Issue, fetchIssueDetails } from "../services/github";
import { PostHeader } from "../components/PostHeader";
import { PostContent } from "../components/PostContent";
import { Skeleton } from "@/components/ui/skeleton";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const postData = await fetchIssueDetails(Number(id));
        setPost(postData);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-0 pt-10">
        <Skeleton className="h-40 rounded-lg mb-10" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-0 pt-10">
        <div className="bg-blog-profile rounded-lg p-8 shadow-lg mb-10">
          <p className="text-blog-subtitle">Post não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <PostHeader post={post} />
      <PostContent content={post.body} />
    </div>
  );
}
