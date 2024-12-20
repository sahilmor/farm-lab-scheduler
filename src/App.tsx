import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { Navigation } from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-[#F5F7F5]">
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/book" element={<Book />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

export default App;