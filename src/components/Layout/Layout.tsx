import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import PolicyModal from "@components/PolicyModal/PolicyModal";
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from "../../constants";

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [policyContent, setPolicyContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const openPolicy = (type: "privacy" | "terms") => {
    if (type === "privacy") {
      setPolicyContent({ title: "Privacy Policy", content: PRIVACY_POLICY });
    } else {
      setPolicyContent({
        title: "Terms of Service",
        content: TERMS_OF_SERVICE,
      });
    }
  };

  const closePolicy = () => {
    setPolicyContent(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: isHomePage ? 0 : 8 }}>
        <Outlet />
      </Box>
      <Footer onOpenPolicy={openPolicy} />

      {policyContent && (
        <PolicyModal
          title={policyContent.title}
          content={policyContent.content}
          onClose={closePolicy}
        />
      )}
    </Box>
  );
};

export default Layout;
