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

  const handleClick = () => {
    onOpenBlog(blog, index);
  };

  return (
    <Card
      className={`${styles.blogCard} ${className}`}
      style={style}
      onClick={handleClick}
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
        "&:hover .blog-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="220"
          image={blog.image}
          alt={blog.title}
          className="blog-image"
          sx={{
            transition: "transform 0.3s ease-in-out",
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
          }}
        />
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
          icon={<AccessTime sx={{ fontSize: 16 }} />}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      <CardContent
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 2,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {blog.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            color: theme.palette.text.secondary,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Person sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
              {blog.author}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
            {blog.date}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {blog.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
        </Typography>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 500,
              fontSize: "0.85rem",
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
