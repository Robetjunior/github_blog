
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      <main className="pb-10 pt-16">
        <Outlet />
      </main>
    </div>
  );
}
