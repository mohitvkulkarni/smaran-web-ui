import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { BLOGS } from "../../constants";
import { type Blog } from "../../types";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./Resources.module.scss";

interface ResourcesProps {
  onOpenBlog: (blog: Blog, globalIndex: number) => void;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Resources: React.FC<ResourcesProps> = ({
  onOpenBlog,
  currentPage: externalCurrentPage,
  onPageChange: externalOnPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pagination state - use external state if provided, otherwise internal state
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);

  const currentPage = externalCurrentPage || internalCurrentPage;
  const setCurrentPage = externalOnPageChange || setInternalCurrentPage;
  const blogsPerPage = 9;
  const totalBlogs = BLOGS.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  // Calculate which blogs to display on current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = BLOGS.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);

    // Scroll to top of resources section when page changes
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle blog opening with global index
  const handleOpenBlog = (blog: Blog, localIndex: number) => {
    const globalIndex = startIndex + localIndex;
    onOpenBlog(blog, globalIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="resources"
      ref={sectionRef}
      className={`${styles.resources} section-padding`}
      sx={{
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h2"
            className={`${styles.title} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3,
            }}
          >
            Latest Articles
          </Typography>

          <Typography
            variant="h6"
            component="p"
            className={`${styles.subtitle} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Explore our collection of articles, stories, and insights that shed
            light on the challenges and opportunities in social development
            work.
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, lg: 3 }}
          sx={{
            justifyContent: currentBlogs.length < 3 ? "center" : "flex-start",
            alignItems: "stretch",
            px: { xs: 1, sm: 0 }, // Add padding for mobile
          }}
        >
          {currentBlogs.map((blog, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={blog.title}
              sx={{
                display: "flex",
                maxWidth: { lg: "33.333333%" }, // Ensure exactly 3 columns on large screens
              }}
            >
              <BlogCard
                blog={blog}
                index={index}
                onOpenBlog={handleOpenBlog}
                className={`${isVisible ? "fade-in visible" : "fade-in"}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  width: "100%",
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
              mb: 4,
              px: 2, // Add padding for mobile
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? "medium" : "large"}
              showFirstButton={!isMobile}
              showLastButton={!isMobile}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 500,
                  minWidth: isMobile ? "32px" : "40px",
                  height: isMobile ? "32px" : "40px",
                },
                "& .Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 4,
            backgroundColor: theme.palette.background.default,
            borderRadius: 3,
          }}
          className={`${styles.resourcesNote} ${
            isVisible ? "fade-in visible" : "fade-in"
          }`}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            These articles represent our ongoing reflection on the challenges
            and opportunities in social development. We believe in sharing
            knowledge and fostering dialogue to create better solutions for our
            communities.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Resources;
