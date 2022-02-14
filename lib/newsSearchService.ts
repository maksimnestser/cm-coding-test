import { formatDateWithLocale } from "../utils/Dates";
import agolia from "./algoliaService";
import { Hit } from "@algolia/client-search";

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

export const fetchNewsItems = async (): Promise<NewsItem[]> => {
  const { hits } = await agolia.search<NewsItemResponse>("", {
    attributesToRetrieve: DEFAULT_NEWS_ATTRS,
  });

  return hits.map(mapNewsItem);
};
