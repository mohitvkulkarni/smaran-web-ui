import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import {
  HomePage,
  CorePrinciplesPage,
  ResourcesPage,
  ProjectsPage,
  AboutPage,
  ContactPage,
} from "./pages";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="core-principles" element={<CorePrinciplesPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
