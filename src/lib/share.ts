import { asset } from "@/lib/asset";

/** The site's link-preview card. Pages that set their own openGraph/twitter
 *  fields must pass it explicitly, or Next drops the inherited image. */
export const shareImage = {
  url: asset("/opengraph-image.jpg"),
  width: 1200,
  height: 630,
  alt: "Adib Akkari Portfolio",
};

export const SITE_URL = "https://adssib.github.io/portfolio";
