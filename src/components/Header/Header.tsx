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
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {NAV_LINKS.map((link) => (
          <ListItem
            key={link.name}
            component={Link}
            to={link.href}
            onClick={handleMobileNavClick}
            sx={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor:
                location.pathname === link.href
                  ? "primary.main"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === link.href
                    ? "primary.dark"
                    : "rgba(46, 82, 102, 0.1)",
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
        elevation={4}
        sx={{
          backgroundColor: "white",
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
                gap: 1,
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Smaran Foundation Logo"
                style={{
                  height: 40,
                  width: "auto",
                  transition: "all 0.3s ease-in-out",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  transition: "color 0.3s ease-in-out",
                  display: { xs: "none", sm: "block" },
                }}
              >
                SMARAN
              </Typography>
            </Box>

            {!isMobile ? (
              <Box sx={{ display: "flex", gap: 1 }}>
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
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textDecoration: "none",
                      backgroundColor:
                        location.pathname === link.href
                          ? theme.palette.primary.main
                          : "transparent",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor:
                          location.pathname === link.href
                            ? theme.palette.primary.dark
                            : "rgba(46, 82, 102, 0.1)",
                        color:
                          location.pathname === link.href
                            ? "white"
                            : theme.palette.primary.main,
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
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
