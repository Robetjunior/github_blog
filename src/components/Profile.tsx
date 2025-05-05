
import { useEffect, useState } from "react";
import { UserData, fetchUser } from "../services/github";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Github, Users, Building } from "lucide-react";

export function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="bg-blog-profile rounded-lg p-8 flex gap-8 -mt-16 shadow-lg">
        <Skeleton className="w-36 h-36 rounded-lg" />
        <div className="flex-1 flex flex-col">
          <Skeleton className="w-3/4 h-8 mb-2" />
          <Skeleton className="w-full h-16 mb-6" />
          <div className="flex gap-6">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-blog-profile rounded-lg p-8 -mt-16 shadow-lg">
        <p className="text-blog-subtitle">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="bg-blog-profile rounded-lg p-8 flex flex-col md:flex-row gap-8 -mt-16 shadow-lg w-full">
      <img
        src={user.avatar_url}
        alt={user.name}
        className="w-36 h-36 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold text-blog-title">{user.name}</h2>
          <Link
            to={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blog-blue text-xs uppercase font-bold flex items-center gap-2 hover:underline"
          >
            GITHUB
            <span className="text-sm">↗</span>
          </Link>
        </div>
        <p className="text-blog-text mb-6">{user.bio}</p>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-blog-subtitle">
            <Github size={18} className="text-blog-span" />
            <span className="text-blog-span">@{user.login}</span>
          </div>
          {user.company && (
            <div className="flex items-center gap-2 text-blog-subtitle">
              <Building size={18} className="text-blog-span" />
              <span className="text-blog-span">{user.company}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-blog-subtitle">
            <Users size={18} className="text-blog-span" />
            <span className="text-blog-span">{user.followers} seguidores</span>
          </div>
        </div>
      </div>
    </div>
  );
}
