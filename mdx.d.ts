declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const metadata: {
    title: string;
    description: string;
    category: string;
    date: string;
  };

  const MDXContent: ComponentType;
  export default MDXContent;
}
