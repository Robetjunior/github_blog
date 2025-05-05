
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Issue } from "../services/github";
import { ArrowLeft, Github, Calendar, MessageSquare } from "lucide-react";

interface PostHeaderProps {
  post: Issue;
}

export function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="bg-blog-profile rounded-lg p-8 mt-8 shadow-lg mb-10">
      <div className="flex justify-between mb-5">
        <Link
          to="/"
          className="text-blog-blue text-xs uppercase font-bold flex items-center gap-2 hover:underline"
        >
          <ArrowLeft size={16} />
          VOLTAR
        </Link>
        <Link
          to={post.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blog-blue text-xs uppercase font-bold flex items-center gap-2 hover:underline"
        >
          VER NO GITHUB
          <span className="text-sm">↗</span>
        </Link>
      </div>

      <h1 className="text-blog-title text-2xl font-bold mb-5">{post.title}</h1>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2 text-blog-span">
          <Github size={18} />
          <span>@{post.user.login}</span>
        </div>
        <div className="flex items-center gap-2 text-blog-span">
          <Calendar size={18} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-blog-span">
          <MessageSquare size={18} />
          <span>{post.comments} comentários</span>
        </div>
      </div>
    </div>
  );
}
