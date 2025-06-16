import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnderConstruction from './pages/UnderConstruction';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router basename="/">
        <Routes>
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/trainingvba" element={<Index />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
