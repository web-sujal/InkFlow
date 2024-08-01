import { authentication, createDirectus, rest } from "@directus/sdk";
import { Blog } from "~/types";

type Schema = {
  blogs: Blog[];
};

const directus = createDirectus<Schema>(process.env.DIRECTUS_URL || "")
  .with(authentication("json"))
  .with(rest());

export default directus;
