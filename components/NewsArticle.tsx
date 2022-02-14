import styled from "@emotion/styled";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { NewsItem } from "../lib/newsSearchService";

interface NewsItemProps extends NewsItem {
  orientation?: "vertical" | "horizontal";
}

const StyledLink = styled.a<{ isVertical: boolean }>((props) => ({
  display: "flex",
  flexDirection: props.isVertical ? "column" : "row",
  flexGrow: 1,
}));

export const NewsArticle: FC<NewsItemProps> = ({
  publicationDate,
  topicsTitles,
  organizationNames,
  description,
  name,
  imageUrl,
  orientation = "horizontal",
  slug,
}) => {
  const isVertical = orientation === "vertical";

  return (
    <Grid
      container
      component="article"
      sx={{
        mb: isVertical ? 0 : 2,
        pb: 2,
        height: "100%",
      }}
    >
      <Link href={`/news/${slug}`} passHref>
        <StyledLink isVertical={isVertical}>
          <Grid
            item
            lg={isVertical ? 12 : 4}
            sx={{
              pr: isVertical ? 0 : 2,
              pb: isVertical ? 1 : 0,
              position: "relative",
            }}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="news"
                width={350}
                height={200}
                layout="responsive"
              />
            )}
          </Grid>
          <Grid
            item
            lg={isVertical ? 12 : 8}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              {topicsTitles.map((title, idx) => (
                <Typography
                  sx={{
                    color: "primary.main",
                    pr: 1,
                    fontSize: ".8rem",
                    fontWeight: "fontWeightMedium",
                    ...(idx && {
                      pl: 1,
                      borderLeft: "2px solid",
                      borderLeftColor: "grey.200",
                    }),
                  }}
                  key={idx}
                >
                  {title}
                </Typography>
              ))}
            </Box>
            <Typography
              variant="body1"
              sx={{
                pb: 1,
                fontWeight: "fontWeightBold",
                color: "text.primary",
                fontSize: isVertical ? "1.25rem" : "1rem",
              }}
            >
              {name}
            </Typography>
            {description && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {description}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "flex-end",
              }}
            >
              {publicationDate && (
                <Typography
                  variant="body2"
                  sx={{
                    pr: 2,
                    borderRight: "2px solid",
                    borderRightColor: "grey.200",
                    color: "text.secondary",
                    fontWeight: "fontWeightMedium",
                  }}
                >
                  {publicationDate}
                </Typography>
              )}
              <Box sx={{ display: "flex", mt: 1 }}>
                {organizationNames.map((name, idx) => (
                  <Typography
                    key={idx}
                    sx={{
                      color: "primary.main",
                      px: 2,
                      fontSize: ".9rem",
                      fontWeight: "fontWeightMedium",
                      ...(idx && {
                        borderLeft: "2px solid",
                        borderLeftColor: "grey.200",
                      }),
                    }}
                  >
                    {name}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        </StyledLink>
      </Link>
    </Grid>
  );
};
