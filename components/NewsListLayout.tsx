import { Container, Grid } from "@mui/material";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { fetchNewsItems, NewsItemsData } from "../lib/newsSearchService";
import { FilterBox } from "./FilterBox";
import { NewsList } from "./NewsList";

interface NewsListProps {
  searchLabel: string;
}

export const NewsListLayout: FC<NewsListProps> = ({ searchLabel }) => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState("");
  const [{ data: newsItems, hitsPerPage, nbHits }, setNewsItems] =
    useState<NewsItemsData>({
      data: [],
      nbHits: 0,
      hitsPerPage: 0,
    });

  const { isLoading } = useQuery(
    ["news", filters, page],
    () => {
      return fetchNewsItems("", { page, filters });
    },
    {
      onSuccess: (data) => {
        setNewsItems((prev) =>
          page ? { ...data, data: prev.data.concat(data.data) } : data
        );
      },
      refetchOnWindowFocus: false,
    }
  );

  const onSubmit = async (query: string) => {
    /* Didn't manage to make filtering work not only for an exact match 😔. 
    Works for 'Mental Health' but not 'Mental'.
    There is a way to call client like client.search("Mental") 
    and then check in _highlightedResult for topics.title 
    but I think this the wrong way */
    setFilters(query ? `topics.title:'${query}'` : "");
    setPage(0);
  };

  const loadNextPage = () => {
    if ((page + 1) * hitsPerPage < nbHits) {
      setPage((page) => page + 1);
    }
  };

  return (
    <Container maxWidth={"lg"} component="main">
      <Grid container spacing={3} component="section">
        <Grid item lg={3}>
          <FilterBox searchLabel={searchLabel} onSubmit={onSubmit} />
        </Grid>
        <NewsList
          loadNextPage={loadNextPage}
          newsItems={newsItems}
          isLoading={isLoading}
        />
      </Grid>
    </Container>
  );
};
