import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { TEAM } from "../../constants";
import styles from "./About.module.scss";

const About: React.FC = () => {
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
      { threshold: isMobile ? 0.05 : 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Box
      id="about"
      ref={sectionRef}
      className={`${styles.about} section-padding`}
      sx={{
        backgroundColor: theme.palette.background.default,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* About Us Section */}
        <Box sx={{ mb: 8 }}>
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
                mb: 2,
              }}
            >
              About Us
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                mx: "auto",
                borderRadius: 2,
                mb: 4,
              }}
            />
            <Typography
              variant="h6"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                px: { xs: 2, md: 0 },
              }}
            >
              We are a collective of millennials — investors, lawyers, teachers,
              psychologists, advocates, and community volunteers — who believe
              that real change begins with intentional collaboration. Each of us
              comes from a different walk of life, shaped by our own
              professional journeys, yet bound by a common goal:{" "}
              <strong>
                to contribute towards building a more equitable, aware, and
                resilient society.
              </strong>
            </Typography>
          </Box>

          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            sx={{ mb: 4, alignItems: "center" }}
          >
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  px: { xs: 1, md: 0 },
                }}
              >
                <img
                  src="/assets/about_us.png"
                  alt="About Us"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: isMobile ? "280px" : "400px",
                    borderRadius: "16px",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  backgroundColor: "rgba(46, 82, 102, 0.05)",
                  borderRadius: 3,
                  border: `2px solid ${theme.palette.secondary.main}20`,
                  mx: { xs: 1, md: 0 },
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: { xs: 1.5, md: 2 },
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Our Journey and Why It Matters to Us?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: { xs: 1.8, md: 1.7 },
                    fontWeight: 300,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    mb: { xs: 2, md: 2.5 },
                  }}
                >
                  We didn't begin as an organisation. We began as conversations
                  between friends, clients, colleagues, and neighbours — about
                  systemic gaps, overlooked voices, and how we could go beyond
                  our professions to bridge those very gaps.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: { xs: 1.8, md: 1.7 },
                    fontWeight: 300,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    mb: { xs: 2, md: 2.5 },
                  }}
                >
                  We are often told that millennials are impatient, idealistic,
                  or distracted. But we've learned that idealism, when grounded
                  in effort, can build movements. That impatience, when
                  channelled right, becomes the urgency that change demands. And
                  that being 'distracted' sometimes just means we're paying
                  attention to things the world prefers to ignore.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: { xs: 1.8, md: 1.7 },
                    fontWeight: 300,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    mb: { xs: 2, md: 2.5 },
                  }}
                >
                  This initiative is our way of focusing that attention where
                  it's needed most — on people, systems, and stories that
                  deserve care, clarity, and community.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: { xs: 1.8, md: 1.7 },
                    fontWeight: 300,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    mb: { xs: 2, md: 2.5 },
                  }}
                >
                  We are not here to save anyone. We are here to walk alongside
                  — with knowledge, compassion, and conviction.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.main,
                    lineHeight: { xs: 1.8, md: 1.7 },
                    fontWeight: 600,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                  }}
                >
                  Because in the end, a better society isn't built by a few
                  experts. It's built by everyday people showing up for each
                  other with what they know, and what they care about.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ px: { xs: 2, md: 0 } }}>
            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              At the heart of our initiative lies a simple yet powerful belief —{" "}
              <strong>
                that knowledge, empathy, and structure have the power to uplift
                entire communities
              </strong>{" "}
              when channelled with purpose. Our group didn't begin as an
              organisation. It began as conversations between friends, clients,
              colleagues, and neighbours — about systemic gaps, overlooked
              voices, and how we could go beyond our professions to bridge those
              very gaps.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 3, md: 4 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              As lawyers, we've seen how the law can protect or fail depending
              on awareness and access. As psychologists, we've understood how
              often mental health is dismissed or buried under survival. As
              community organisers and educators, we've felt the urgency of
              voices that go unheard in decision-making processes. What brought
              us together was the idea that{" "}
              <strong>
                our skills aren't meant to stay siloed — they're meant to be
                shared, adapted, and used for collective wellbeing.
              </strong>
            </Typography>
          </Box>

          {/* Our Objectives Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h3"
              className={`${styles.title} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 2,
              }}
            >
              Why Our Objectives Matter?
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                backgroundColor: theme.palette.secondary.main,
                mx: "auto",
                borderRadius: 2,
                mb: 3,
              }}
            />
          </Box>

          <Box sx={{ px: { xs: 2, md: 0 }, mb: 6 }}>
            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 3, md: 4 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              Our objectives are not just organisational statements — they are
              personal promises. Promises to respond to the inequalities we have
              witnessed in courts, clinics, classrooms, and homes. Each
              objective is born out of something we've experienced first-hand:
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                To simplify legal access
              </Box>{" "}
              because we've seen too many people kept away from justice due to
              jargon and gatekeeping. We aim to make laws understandable and
              accessible so that every individual knows their rights and
              protections.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                To normalise mental health conversations
              </Box>{" "}
              in everyday spaces, because we've seen how silence leads to
              suffering. We promote open, stigma-free discussions where seeking
              help is seen as a sign of strength.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                To strengthen communities
              </Box>{" "}
              through education, rights awareness, and dialogue, because we
              believe in long-term empowerment — not one-time relief.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                To empower women and youth
              </Box>{" "}
              recognising their potential as drivers of change. Opportunities
              for leadership, skill-building, and economic independence are
              created to help them thrive.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                To promote sustainable environmental development and
                preservation
              </Box>{" "}
              ensuring that growth respects the planet. We support initiatives
              that protect natural resources while enabling eco-friendly
              livelihoods.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 2.5, md: 3 },
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                To champion disability inclusion
              </Box>{" "}
              ensuring dignity, access, and opportunity for all. We work to
              remove physical, social, and systemic barriers faced by persons
              with disabilities.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className={`${styles.subtitle} ${
                isVisible ? "fade-in visible" : "fade-in"
              }`}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "900px",
                mx: "auto",
                lineHeight: { xs: 1.8, md: 1.7 },
                fontWeight: 300,
                mb: { xs: 3, md: 4 },
                fontSize: { xs: "0.95rem", md: "1rem" },
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              In a world that's increasingly fragmented, our objective is{" "}
              <strong>
                to build bridges — between knowledge and people, between rights
                and reach, between care and access
              </strong>
              . For us, this means not just working <em>for</em> the community,
              but <em>with</em> it — listening as much as we speak, learning as
              much as we teach.
            </Typography>
          </Box>
        </Box>

        {/* Team Section */}
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
              mb: 2,
            }}
          >
            Our Team
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              backgroundColor: theme.palette.secondary.main,
              mx: "auto",
              borderRadius: 2,
              mb: 4,
            }}
          />
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
            Our diverse team brings together expertise from law, education,
            social work, and community development to create meaningful impact
            in the communities we serve.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {TEAM.map((member, index) => (
            <Grid item xs={12} sm={6} lg={3} key={member.name}>
              <Card
                className={`${styles.teamCard} ${
                  isVisible || isMobile ? "fade-in visible" : "fade-in"
                }`}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  animationDelay: `${index * 0.1}s`,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                  "&:hover .team-avatar": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box className={styles.cardGradient} />
                <CardContent
                  sx={{
                    p: 3,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    className="team-avatar"
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      border: `3px solid ${theme.palette.secondary.main}`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    {member.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontWeight: 500,
                      mb: 2,
                    }}
                  >
                    {member.role}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontSize: "0.875rem",
                    }}
                  >
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
