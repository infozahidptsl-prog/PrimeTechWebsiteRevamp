import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ContentProvider } from './contexts/ContentContext';
import { Site } from './pages/Site';
import { Admin } from './pages/Admin';

export function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Site />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" closeButton toastOptions={{ style: { fontFamily: 'Figtree, sans-serif' } }} />
    </ContentProvider>);

}