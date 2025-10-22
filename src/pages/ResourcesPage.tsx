import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Resources from "@components/Resources/Resources";
import BlogModal from "@components/BlogModal/BlogModal";
import { type Blog } from "../types";
import { BLOGS } from "../constants";

const ResourcesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedBlogIndex, setSelectedBlogIndex] = useState<number>(-1);

  // Get initial page from URL or default to 1, with validation
  const pageParam = searchParams.get("page");
  const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
  const totalPages = Math.ceil(BLOGS.length / 9);
  const validatedPage = Math.max(1, Math.min(parsedPage, totalPages));
  const [currentPage, setCurrentPage] = useState(validatedPage);

  // Update URL when page changes
  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams({ page: currentPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [currentPage, setSearchParams]);

  const openBlog = (blog: Blog, globalIndex: number) => {
    setSelectedBlog(blog);
    setSelectedBlogIndex(globalIndex);
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setSelectedBlogIndex(-1);
  };

  const handleNextBlog = () => {
    if (selectedBlogIndex < BLOGS.length - 1) {
      const nextIndex = selectedBlogIndex + 1;
      setSelectedBlog(BLOGS[nextIndex]);
      setSelectedBlogIndex(nextIndex);
    }
  };

  const handlePrevBlog = () => {
    if (selectedBlogIndex > 0) {
      const prevIndex = selectedBlogIndex - 1;
      setSelectedBlog(BLOGS[prevIndex]);
      setSelectedBlogIndex(prevIndex);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 6, color: "primary.main" }}
        >
          Resources & Insights
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 8, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
        >
          Explore our collection of articles, insights, and stories that shed
          light on the challenges and opportunities in social work, community
          development, and inclusive growth.
        </Typography>
      </Container>

      <Resources
        onOpenBlog={openBlog}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={closeBlog}
          onNext={handleNextBlog}
          onPrev={handlePrevBlog}
          isFirst={selectedBlogIndex === 0}
          isLast={selectedBlogIndex === BLOGS.length - 1}
        />
      )}
    </Box>
  );
};

export default ResourcesPage;
