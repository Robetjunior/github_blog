
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const Post = React.lazy(() => import("./pages/Post"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Loading fallback
const PageLoader = () => (
  <div className="max-w-4xl mx-auto px-4 md:px-0 pt-16">
    <Skeleton className="h-64 rounded-lg mb-8" />
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Suspense fallback={<PageLoader />}>
                  <Home />
                </Suspense>
              } />
              <Route path="/post/:id" element={
                <Suspense fallback={<PageLoader />}>
                  <Post />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
