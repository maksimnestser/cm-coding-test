import { Grid } from "@mui/material";
import React, { FC } from "react";
import { NewsItem } from "../lib/newsSearchService";
import { NewsArticle } from "./NewsArticle";

interface PopularNewsProps {
  news: NewsItem[];
}

const GRID_MAX_COLUMNS = 12;

export const PopularNews: FC<PopularNewsProps> = ({ news }) => {
  const gridLgSize = GRID_MAX_COLUMNS / news.length;

  return (
    <Grid container spacing={2}>
      {news.map((n) => (
        <Grid key={n.slug} item lg={gridLgSize}>
          <NewsArticle orientation="vertical" {...n} description={""} />
        </Grid>
      ))}
    </Grid>
  );
};
