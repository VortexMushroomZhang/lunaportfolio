import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/custom-cursor";
import FilmGrain from "@/components/film-grain";
import BackgroundGrid from "@/components/background-grid";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Exploration from "@/pages/exploration";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/exploration" component={Exploration} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <FilmGrain />
        <BackgroundGrid />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
