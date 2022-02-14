import { Entry } from "contentful";
import contentful from "./contentfulService";

export type NewsPageData = ReturnType<typeof mapNewsPageData>;
interface EntryItem {
  ttile: string;
  menuLabel: string;
  searchLabel: string;
  logo: {
    fields: {
      title: string;
      description: string;
      file: {
        contentType: string;
        fileName: string;
        url: string;
        details: {
          image: { width: number; height: number };
        };
      };
    };
  };
}

const mapNewsPageData = (items: Entry<EntryItem>[]) => {
  const logoData = {
    url: `https:${items[0].fields.logo.fields.file.url}`,
    width: items[0].fields.logo.fields.file.details.image.width,
    height: items[0].fields.logo.fields.file.details.image.height,
  };
  const title = items[0].fields.ttile;
  const searchLabel = items[0].fields.searchLabel;
  const menuLabel = items[0].fields.menuLabel;

  return {
    logoData,
    title,
    searchLabel,
    menuLabel,
  };
};

export const fetchNewsPageData = async () => {
  const { items } = await contentful.getEntries<EntryItem>({
    content_type: "newsConfig",
  });

  return mapNewsPageData(items);
};
