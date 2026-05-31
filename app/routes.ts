import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/about/index.tsx"),
  route("writing", "pages/writing/index.tsx"),
  route("writing/:tag", "pages/tag/index.tsx"),
  route("writing/:tag/:slug", "pages/article/index.tsx"),
] satisfies RouteConfig;
