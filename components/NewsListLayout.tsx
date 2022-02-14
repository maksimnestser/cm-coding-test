import { Container, Grid } from "@mui/material";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { fetchNewsItems, NewsItem } from "../lib/newsSearchService";
import { FilterBox } from "./FilterBox";
import { NewsList } from "./NewsList";

interface NewsListLayoutProps {
  searchLabel: string;
}

export const NewsListLayout: FC<NewsListLayoutProps> = ({ searchLabel }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  const { isLoading } = useQuery(
    "news",
    () => {
      return fetchNewsItems();
    },
    {
      onSuccess: (data) => {
        setNewsItems(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const onSubmit = () => {};

  return (
    <Container maxWidth={"lg"} component="main">
      <Grid container spacing={3} component="section">
        <Grid item lg={3}>
          <FilterBox searchLabel={searchLabel} onSubmit={onSubmit} />
        </Grid>
        <NewsList newsItems={newsItems} isLoading={isLoading} />
      </Grid>
    </Container>
  );
};
