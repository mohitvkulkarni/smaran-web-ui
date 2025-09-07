import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { BLOGS } from "../../constants";
import { type Blog } from "../../types";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./Resources.module.scss";

interface ResourcesProps {
  onOpenBlog: (blog: Blog, index: number) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onOpenBlog }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

        <Grid container spacing={4}>
          {BLOGS.map((blog, index) => (
            <Grid item xs={12} sm={6} lg={4} key={blog.title}>
              <BlogCard
                blog={blog}
                index={index}
                onOpenBlog={onOpenBlog}
                className={`${isVisible ? "fade-in visible" : "fade-in"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            </Grid>
          ))}
        </Grid>

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
