import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../constants";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 2 }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: "rgba(27, 54, 93, 0.08)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ px: 1 }}>
        {NAV_LINKS.map((link) => (
          <ListItem
            key={link.name}
            component={Link}
            to={link.href}
            onClick={handleMobileNavClick}
            sx={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 2,
              mb: 0.5,
              mx: 1,
              backgroundColor:
                location.pathname === link.href
                  ? "primary.main"
                  : "transparent",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor:
                  location.pathname === link.href
                    ? "primary.dark"
                    : "rgba(27, 54, 93, 0.08)",
                "& .MuiListItemText-primary": {
                  color:
                    location.pathname === link.href ? "white" : "primary.main",
                },
              },
            }}
          >
            <ListItemText
              primary={link.name}
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: location.pathname === link.href ? 600 : 500,
                  color:
                    location.pathname === link.href
                      ? "white"
                      : theme.palette.text.primary,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  opacity: 0.8,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Smaran Foundation Logo"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  transition: "color 0.3s ease-in-out",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Smaran Foundation
              </Typography>
            </Box>

            {!isMobile ? (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.name}
                    component={Link}
                    to={link.href}
                    sx={{
                      color:
                        location.pathname === link.href
                          ? "white"
                          : theme.palette.text.primary,
                      fontWeight: location.pathname === link.href ? 600 : 500,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      textDecoration: "none",
                      backgroundColor:
                        location.pathname === link.href
                          ? theme.palette.primary.main
                          : "transparent",
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      "&:hover": {
                        backgroundColor:
                          location.pathname === link.href
                            ? theme.palette.primary.dark
                            : "rgba(27, 54, 93, 0.08)",
                        color:
                          location.pathname === link.href
                            ? "white"
                            : theme.palette.primary.main,
                        transform: "translateY(-1px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: theme.palette.primary.main,
                  transition: "color 0.3s ease-in-out",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
