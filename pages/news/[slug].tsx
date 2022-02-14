import { CircularProgress, Container } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { NewsArticle } from "../../components/NewsArticle";
import {
  fetchNewsItem,
  fetchNewsItems,
  NewsItem,
} from "../../lib/newsSearchService";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const newsItems = await fetchNewsItems();
  const paths = newsItems.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<NewsItem | {}, Params> = async ({
  params,
}) => {
  if (params?.slug) {
    const newsItem = await fetchNewsItem(params.slug);
    return newsItem ? { props: newsItem } : { notFound: true };
  }

  return {
    notFound: true,
  };
};

const NewsItemPage: NextPage<NewsItem> = (newsItem) => {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {router.isFallback ? (
        <CircularProgress />
      ) : (
        <NewsArticle orientation="horizontal" {...newsItem} />
      )}
    </Container>
  );
};

export default NewsItemPage;
