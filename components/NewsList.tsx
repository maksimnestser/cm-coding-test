import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { NewsItem } from "../lib/newsSearchService";

import { IObserver } from "./IObserver";
import { NewsArticle } from "./NewsArticle";

interface NewsListProps {
  loadNextPage: () => void;
  newsItems: NewsItem[];
  isLoading: boolean;
}

export const NewsList: FC<NewsListProps> = ({
  newsItems,
  loadNextPage,
  isLoading,
}) => {
  return (
    <>
      <Grid item lg={9} component={"ul"}>
        <Box
          sx={{
            pb: 1,
            mb: 2,
            borderBottom: "2px solid",
            borderColor: "grey.200",
          }}
        >
          {!!newsItems?.length && (
            <Typography
              sx={{
                color: "text.primary",
                fontWeight: "fontWeightBold",
              }}
            >
              {newsItems.length} Resources Found
            </Typography>
          )}
        </Box>

        {newsItems.map((n) => (
          <Grid
            key={n.slug}
            item
            lg={12}
            component={"li"}
            sx={{ listStyleType: "none" }}
          >
            <NewsArticle {...n} orientation="horizontal" />
          </Grid>
        ))}

        {!!newsItems.length && <IObserver onIntersecting={loadNextPage} />}

        {isLoading && (
          <Box textAlign={"center"}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
};
