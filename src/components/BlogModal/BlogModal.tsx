import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  Grid,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime,
  Person,
} from "@mui/icons-material";
import { type Blog } from "../../types";
import styles from "./BlogModal.module.scss";

interface BlogModalProps {
  blog: Blog;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const BlogModal: React.FC<BlogModalProps> = ({
  blog,
  onClose,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const mobileScrollRef = React.useRef<HTMLDivElement>(null);
  const desktopScrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll to top function
  const scrollToTop = () => {
    const scrollContainer = isMobile
      ? mobileScrollRef.current
      : desktopScrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Enhanced navigation handlers with scroll
  const handlePrev = () => {
    onPrev();
    setTimeout(scrollToTop, 100); // Small delay to ensure content is updated
  };

  const handleNext = () => {
    onNext();
    setTimeout(scrollToTop, 100); // Small delay to ensure content is updated
  };

  // Scroll to top when blog changes
  useEffect(() => {
    scrollToTop();
  }, [blog.title]); // Trigger when blog changes

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          if (!isFirst) {
            event.preventDefault();
            handlePrev();
          }
          break;
        case "ArrowRight":
          if (!isLast) {
            event.preventDefault();
            handleNext();
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFirst, isLast, onNext, onPrev, onClose]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      fullScreen={isMobile}
      className={styles.blogModal}
      aria-labelledby="blog-modal-title"
      aria-describedby="blog-modal-content"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: "95vh",
          width: isMobile ? "100%" : "95vw",
          maxWidth: isMobile ? "100%" : "1400px",
          height: isMobile ? "100vh" : "90vh",
        },
      }}
    >
      {/* Header with close and navigation */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isFirst && (
            <IconButton
              onClick={handlePrev}
              size="small"
              aria-label="Previous article"
              title="Previous article (Left arrow key)"
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {!isLast && (
            <IconButton
              onClick={handleNext}
              size="small"
              aria-label="Next article"
              title="Next article (Right arrow key)"
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}
        </Box>

        <Chip
          label={blog.readTime}
          size="small"
          icon={<AccessTime sx={{ fontSize: 16 }} />}
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            fontWeight: 500,
          }}
        />

        <IconButton
          onClick={onClose}
          aria-label="Close article"
          title="Close article (Escape key)"
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          p: 0,
          height: "calc(100% - 73px)", // Subtract header height
          overflow: "hidden",
        }}
        className={styles.modalContent}
      >
        {isMobile ? (
          // Mobile: Vertical layout with scrollable content
          <Box
            ref={mobileScrollRef}
            sx={{
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* Mobile Image Section */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: "40vh",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={blog.image}
                alt={blog.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  minHeight: "40vh",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>

            {/* Mobile Content Section */}
            <Box sx={{ p: 3 }}>
              <Typography
                id="blog-modal-title"
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                {blog.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  color: theme.palette.text.secondary,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Person sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {blog.author}
                  </Typography>
                </Box>
                <Typography variant="body2">{blog.date}</Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box
                id="blog-modal-content"
                className={`${styles.blogContent} blog-content`}
                sx={{
                  "& p": {
                    mb: 2,
                    lineHeight: 1.7,
                    color: theme.palette.text.primary,
                  },
                  "& h3": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                  },
                  "& h4": {
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    mt: 2,
                    mb: 1,
                  },
                  "& ul, & ol": {
                    mb: 2,
                    pl: 3,
                    "& li": {
                      mb: 1,
                      lineHeight: 1.6,
                    },
                  },
                  "& strong": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Mobile Navigation Footer */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                  pt: 3,
                  pb: 4, // Added padding bottom
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box>
                  {!isFirst && (
                    <Typography
                      variant="body2"
                      onClick={handlePrev}
                      sx={{
                        color: theme.palette.secondary.main,
                        cursor: "pointer",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      ← Previous
                    </Typography>
                  )}
                </Box>
                <Box>
                  {!isLast && (
                    <Typography
                      variant="body2"
                      onClick={handleNext}
                      sx={{
                        color: theme.palette.secondary.main,
                        cursor: "pointer",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Next →
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          // Desktop/Tablet: Side-by-side layout
          <Grid container sx={{ height: "100%" }}>
            {/* Image Section */}
            <Grid
              item
              xs={12}
              md={isTablet ? 5 : 6}
              sx={{
                height: "100%",
                overflow: "auto",
                backgroundColor: theme.palette.grey[50],
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={blog.image}
                  alt={blog.title}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
            </Grid>

            {/* Content Section */}
            <Grid
              ref={desktopScrollRef}
              item
              xs={12}
              md={isTablet ? 7 : 6}
              sx={{
                height: "100%",
                overflow: "auto",
                backgroundColor: "white",
              }}
            >
              <Box sx={{ p: isTablet ? 3 : 4, height: "100%" }}>
                <Typography
                  id="blog-modal-title"
                  variant={isTablet ? "h5" : "h4"}
                  component="h1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {blog.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    color: theme.palette.text.secondary,
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Person sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {blog.author}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{blog.date}</Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box
                  id="blog-modal-content"
                  className={`${styles.blogContent} blog-content`}
                  sx={{
                    "& p": {
                      mb: 2,
                      lineHeight: 1.7,
                      color: theme.palette.text.primary,
                      fontSize: isTablet ? "0.95rem" : "1rem",
                    },
                    "& h3": {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mt: 3,
                      mb: 2,
                      fontSize: isTablet ? "1.1rem" : "1.25rem",
                    },
                    "& h4": {
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      mt: 2,
                      mb: 1,
                      fontSize: isTablet ? "1rem" : "1.125rem",
                    },
                    "& ul, & ol": {
                      mb: 2,
                      pl: 3,
                      "& li": {
                        mb: 1,
                        lineHeight: 1.6,
                        fontSize: isTablet ? "0.95rem" : "1rem",
                      },
                    },
                    "& strong": {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Desktop Navigation Footer */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                    pt: 3,
                    pb: 4, // Added padding bottom
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box>
                    {!isFirst && (
                      <Typography
                        variant="body2"
                        onClick={handlePrev}
                        sx={{
                          color: theme.palette.secondary.main,
                          cursor: "pointer",
                          fontWeight: 500,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        ← Previous Article
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    {!isLast && (
                      <Typography
                        variant="body2"
                        onClick={handleNext}
                        sx={{
                          color: theme.palette.secondary.main,
                          cursor: "pointer",
                          fontWeight: 500,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Next Article →
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
