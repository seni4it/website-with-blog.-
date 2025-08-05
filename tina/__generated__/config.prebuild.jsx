// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  // For local development
  localContentPath: "content",
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-")}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            options: ["Dr. Shimon Roitman", "Guest Author"]
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Clinical Cases",
              "Clinical Techniques",
              "Technology",
              "Patient Education",
              "Practice Management"
            ]
          },
          {
            type: "datetime",
            name: "date",
            label: "Published Date",
            required: true
          },
          {
            type: "number",
            name: "readingTime",
            label: "Reading Time (minutes)",
            required: true
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Blog Content",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
