import { formatDateWithLocale } from "../utils/Dates";
import client from "./algoliaService";
import { Hit, SearchOptions } from "@algolia/client-search";
import { RequestOptions } from "@algolia/transporter";

interface NewsItemResponse {
  slug: string;
  description: string;
  name: string;
  imageUrl: string;
  topics: Array<{
    title: string;
  }>;
  publicationDate: string | undefined;
  organization: Array<{
    fields: {
      name: string;
    };
  }>;
}

export type NewsItem = ReturnType<typeof mapNewsItem>;
type PromiseInfer<T> = T extends Promise<infer S> ? S : never;
export type NewsItemsData = PromiseInfer<ReturnType<typeof fetchNewsItems>>;

const DEFAULT_NEWS_ATTRS = [
  "slug",
  "topics",
  "description",
  "name",
  "organization",
  "imageUrl",
  "publicationDate",
];

const mapNewsItem = (item: Hit<NewsItemResponse>) => {
  return {
    slug: item.slug,
    description: item.description,
    name: item.name,
    imageUrl: item.imageUrl,
    topicsTitles: item.topics.map((t) => t.title),
    publicationDate: item.publicationDate
      ? formatDateWithLocale(new Date(item.publicationDate))
      : "N/A",
    organizationNames: item.organization.map((o) => o.fields.name),
  };
};

export const fetchNewsItems = async (
  query = "",
  params: RequestOptions & SearchOptions = {
    attributesToRetrieve: DEFAULT_NEWS_ATTRS,
  }
) => {
  const { hits, nbHits, hitsPerPage } = await client.search<NewsItemResponse>(
    query,
    params
  );

  return {
    data: hits.map(mapNewsItem),
    nbHits,
    hitsPerPage,
  };
};

export const fetchNewsItem = async (slug: string) => {
  const { hits } = await client.search<NewsItemResponse>("", {
    filters: `slug:${slug}`,
    attributesToRetrieve: DEFAULT_NEWS_ATTRS,
  });

  return hits[0] ? mapNewsItem(hits[0]) : null;
};
