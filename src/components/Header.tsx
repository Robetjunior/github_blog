
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full py-16 flex items-center justify-center bg-blog-input relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-8 w-full h-1 bg-blog-blue"></div>
        <div className="absolute right-20 top-16 w-20 h-1 bg-blog-blue"></div>
        <div className="absolute left-32 bottom-8 w-40 h-1 bg-blog-blue"></div>
        <div className="absolute left-8 top-24 w-1 h-16 bg-blog-blue"></div>
        <div className="absolute right-48 top-0 w-1 h-24 bg-blog-blue"></div>
        <div className="absolute right-16 bottom-16 w-1 h-20 bg-blog-blue"></div>
      </div>
      <Link to="/" className="z-10">
        <div className="flex flex-col items-center">
          <span className="text-blog-blue text-2xl mb-2">{'<>'}</span>
          <h1 className="text-blog-title text-2xl font-bold">GITHUB BLOG</h1>
        </div>
      </Link>
    </header>
  );
}
