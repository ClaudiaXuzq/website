import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog");
const BLOG_FILE_PATTERN = /\.(md|mdx)$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type BlogLanguage = "zh-CN" | "en";

export type BlogMetadata = {
  title: string;
  description: string;
  date: `${number}-${number}-${number}`;
  tags: readonly string[];
  lang: BlogLanguage;
  slug: string;
  author?: string;
  updated?: `${number}-${number}-${number}`;
  draft: boolean;
};

export type BlogPost = BlogMetadata & {
  content: string;
  sourcePath: string;
};

function assertString(
  data: Record<string, unknown>,
  field: string,
  filename: string,
) {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Blog frontmatter error in ${filename}: "${field}" must be a non-empty string.`);
  }
  return value.trim();
}

function assertDate(value: string, field: string, filename: string) {
  if (!DATE_PATTERN.test(value)) {
    throw new Error(`Blog frontmatter error in ${filename}: "${field}" must use YYYY-MM-DD.`);
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`Blog frontmatter error in ${filename}: "${field}" is not a valid date.`);
  }

  return value as `${number}-${number}-${number}`;
}

function parseMetadata(
  data: Record<string, unknown>,
  filename: string,
): BlogMetadata {
  const filenameSlug = filename.replace(BLOG_FILE_PATTERN, "");
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : filenameSlug;

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Blog frontmatter error in ${filename}: slug "${slug}" must contain only lowercase letters, numbers, and hyphens.`,
    );
  }

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    throw new Error(`Blog frontmatter error in ${filename}: "tags" must be an array of non-empty strings.`);
  }

  const lang = assertString(data, "lang", filename);
  if (lang !== "zh-CN" && lang !== "en") {
    throw new Error(`Blog frontmatter error in ${filename}: "lang" must be "zh-CN" or "en".`);
  }

  const date = assertDate(assertString(data, "date", filename), "date", filename);
  const updated =
    data.updated === undefined
      ? undefined
      : assertDate(assertString(data, "updated", filename), "updated", filename);

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new Error(`Blog frontmatter error in ${filename}: "draft" must be true or false.`);
  }

  return {
    title: assertString(data, "title", filename),
    description: assertString(data, "description", filename),
    date,
    tags: data.tags.map((tag) => (tag as string).trim()),
    lang,
    slug,
    author:
      data.author === undefined ? undefined : assertString(data, "author", filename),
    updated,
    draft: data.draft ?? false,
  };
}

function readPosts() {
  const filenames = fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((filename) => BLOG_FILE_PATTERN.test(filename));

  const posts = filenames.map((filename) => {
    const sourcePath = path.join(BLOG_DIRECTORY, filename);
    const source = fs.readFileSync(sourcePath, "utf8");
    const { data, content } = matter(source);

    return {
      ...parseMetadata(data, filename),
      content,
      sourcePath,
    } satisfies BlogPost;
  });

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate Blog slug: "${post.slug}".`);
    }
    seen.add(post.slug);
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function isVisible(post: BlogPost) {
  return process.env.NODE_ENV !== "production" || !post.draft;
}

export function getAllPosts() {
  return readPosts().filter(isVisible);
}

export function getLatestPosts(limit = 5) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return readPosts().find((post) => post.slug === slug && isVisible(post));
}
