import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import React, { FC } from "react";
import { fetchNewsItems, NewsItem } from "../lib/newsSearchService";
import { NewsHeader } from "../components/NewsHeader";

import { PopularNews } from "../components/PopularNews";
import { fetchNewsPageData, NewsPageData } from "../lib/newsService";
import { NewsListLayout } from "../components/NewsListLayout";

export const getStaticProps = async () => {
  const [pageData, popularNews] = await Promise.all([
    fetchNewsPageData(),
    fetchNewsItems(),
  ]);

  return {
    props: { pageData, popularNews },
  };
};

interface NewsPageProps {
  pageData: NewsPageData;
  popularNews: NewsItem[];
}

const POPULAR_NEWS_COUNT = 3;

const NewsPage: FC<NewsPageProps> = ({
  pageData: { logoData, title, menuLabel, searchLabel },
  popularNews,
}) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>
      <NewsHeader logoData={logoData} menuLabel={menuLabel} />
      <Box
        sx={{ borderBottom: "1px solid", borderColor: "grey.200", mb: 2 }}
        component="section"
      >
        <Container
          sx={{
            pb: 2,
          }}
          maxWidth="lg"
        >
          <Typography
            variant="h2"
            sx={{
              pt: 6,
              pb: 8,
              color: "text.primary",
              fontWeight: "fontWeightBold",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            {title}
          </Typography>
          <PopularNews news={popularNews.slice(0, POPULAR_NEWS_COUNT)} />
        </Container>
      </Box>
      <NewsListLayout searchLabel={searchLabel} />
    </Box>
  );
};

export default NewsPage;
