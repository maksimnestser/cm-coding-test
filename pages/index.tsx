import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC } from "react";

import { NewsHeader } from "../components/NewsHeader";
import { fetchNewsPageData, NewsPageData } from "../lib/newsService";

export const getStaticProps = async () => {
  const pageData = await fetchNewsPageData();

  return {
    props: { pageData },
  };
};

interface NewsPageProps {
  pageData: NewsPageData;
}

const NewsPage: FC<NewsPageProps> = ({
  pageData: { logoData, title, menuLabel },
}) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>
      <NewsHeader logoData={logoData} menuLabel={menuLabel} />
    </Box>
  );
};

export default NewsPage;
