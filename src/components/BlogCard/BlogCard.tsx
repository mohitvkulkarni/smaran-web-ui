import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import { type Blog } from "../../types";
import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  blog: Blog;
  index: number;
  onOpenBlog: (blog: Blog, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  index,
  onOpenBlog,
  className = "",
  style = {},
}) => {
  const theme = useTheme();
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    onOpenBlog(blog, index);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card
      ref={cardRef}
      className={`${styles.blogCard} ${className}`}
      style={style}
      onClick={handleClick}
      sx={{
        height: 400, // Fixed height for consistent grid alignment
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
        "&:hover .blog-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
        {!imageError && isVisible ? (
          <CardMedia
            component="img"
            height="200"
            image={blog.image}
            alt={blog.title}
            className="blog-image"
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
            sx={{
              transition: "transform 0.3s ease-in-out",
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
              opacity: imageLoaded ? 1 : 0.7,
            }}
          />
        ) : !isVisible ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: theme.palette.grey[100],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Loading...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: theme.palette.grey[200],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.text.secondary,
            }}
          >
            <Typography variant="body2">Image not available</Typography>
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)",
          }}
        />
        <Chip
          label={blog.readTime}
          size="small"
          icon={<AccessTime sx={{ fontSize: 14 }} />}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(4px)",
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: "0.75rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      <CardContent
        sx={{
          p: 2.5,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: 200, // Fixed content height
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 1.5,
            lineHeight: 1.3,
            fontSize: "1.1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.6rem", // Ensure consistent title space
          }}
        >
          {blog.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
            color: theme.palette.text.secondary,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Person sx={{ fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              {blog.author}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {blog.date}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.5,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.85rem",
            mb: 1.5,
          }}
        >
          {blog.content.replace(/<[^>]*>/g, "").substring(0, 120)}...
        </Typography>

        <Box
          sx={{
            mt: "auto",
            pt: 1.5,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 600,
              fontSize: "0.85rem",
              transition: "color 0.2s ease-in-out",
            }}
          >
            Read More →
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
