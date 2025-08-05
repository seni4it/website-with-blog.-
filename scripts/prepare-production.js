#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Preparing production build (removing admin panel)...');

// Create backup of original App.tsx
const appPath = 'src/App.tsx';
const backupPath = 'src/App.dev.tsx';

// Read the current App.tsx
const appContent = fs.readFileSync(appPath, 'utf8');

// Create backup
fs.writeFileSync(backupPath, appContent);

// Create production version without admin routes
const productionAppContent = `import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { TinaProviderWrapper } from "./components/TinaProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TinaProviderWrapper>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* PRODUCTION BUILD - ADMIN PANEL EXCLUDED FOR SECURITY */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </TinaProviderWrapper>
  </QueryClientProvider>
);

export default App;
`;

// Write production version
fs.writeFileSync(appPath, productionAppContent);

console.log('✅ Production App.tsx created (admin routes removed)');
console.log('💾 Original App.tsx backed up to App.dev.tsx');