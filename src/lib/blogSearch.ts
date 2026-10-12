/**
 * Client-side search over the blog listing. Plain functions, no React, so the
 * ranking and highlighting can be tested on their own.
 *
 * Matching is word-start and accent-insensitive: "staff" finds "Staffing",
 * "resume" finds "Résumé", and every word of the query must appear somewhere in
 * the post (title, topic, introduction or author). Query text is never turned
 * into a RegExp, so characters like "(" or "+" cannot break it.
 */

export interface SearchablePost {
  slug: string;
  title: string;
  category: string;
  introduction?: string;
  author?: string;
}

interface IndexedPost<T extends SearchablePost> {
  post: T;
  title: string;
  category: string;
  introduction: string;
  author: string;
  /** Title, introduction and author with hyphens etc. joined, so "talentifix" finds "TalentiFi-X". */
  joined: string;
}

export interface SearchHit<T extends SearchablePost> {
  post: T;
  score: number;
}

/** A run of text, flagged when it matched the query. */
export interface TextSegment {
  text: string;
  match: boolean;
}

const MAX_TOKENS = 8;
const WORD_CHAR = /[\p{L}\p{N}]/u;
const NON_WORD = /[^\p{L}\p{N}]+/u;

/** Lowercase with accents removed, so "Résumé" and "resume" compare equal. */
export function normalize(text: string): string {
  return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
}

/** The query's distinct words; punctuation and hyphens separate words. */
export function tokenize(query: string): string[] {
  const words = normalize(query).split(NON_WORD).filter(Boolean);
  return Array.from(new Set(words)).slice(0, MAX_TOKENS);
}

const isWordChar = (ch: string | undefined) => !!ch && WORD_CHAR.test(ch);

/** Index of the first occurrence of `token` at the start of a word, or -1. */
function wordStartIndex(haystack: string, token: string, from = 0): number {
  let at = haystack.indexOf(token, from);
  while (at !== -1) {
    if (at === 0 || !isWordChar(haystack[at - 1])) return at;
    at = haystack.indexOf(token, at + 1);
  }
  return -1;
}

/**
 * Joins the parts of hyphenated or slashed words ("talentifi-x" to "talentifix",
 * "ai/ml" to "aiml") while keeping spaces, so word-start matching still applies.
 * Lookahead only: lookbehind would be a syntax error in Safari before 16.4.
 */
const joinWords = (text: string) => text.replace(/([\p{L}\p{N}])[-'’/.]+(?=[\p{L}\p{N}])/gu, "$1");

/** Normalise every post once, so each keystroke only compares strings. */
export function buildSearchIndex<T extends SearchablePost>(posts: T[]): IndexedPost<T>[] {
  return posts.map((post) => {
    const title = normalize(post.title);
    const introduction = normalize(post.introduction ?? "");
    const author = normalize(post.author ?? "");
    return {
      post,
      title,
      category: normalize(post.category),
      introduction,
      author,
      joined: joinWords(`${title} ${introduction} ${author}`),
    };
  });
}

/**
 * Posts matching every word of the query, best first. Title matches outrank
 * topic matches, which outrank introduction and author matches; ties keep the
 * index order (newest first). An empty query matches nothing.
 */
export function searchIndex<T extends SearchablePost>(
  index: IndexedPost<T>[],
  query: string,
): SearchHit<T>[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const phrase = tokens.join(" ");

  const hits: SearchHit<T>[] = [];
  for (const entry of index) {
    let score = 0;
    let matchesAll = true;
    for (const token of tokens) {
      const inTitle = wordStartIndex(entry.title, token) !== -1;
      const inCategory = wordStartIndex(entry.category, token) !== -1;
      const inIntro = wordStartIndex(entry.introduction, token) !== -1;
      const inAuthor = wordStartIndex(entry.author, token) !== -1;
      const inJoined = token.length >= 3 && wordStartIndex(entry.joined, token) !== -1;
      if (!inTitle && !inCategory && !inIntro && !inAuthor && !inJoined) {
        matchesAll = false;
        break;
      }
      score += (inTitle ? 4 : 0) + (inCategory ? 2 : 0) + (inIntro ? 1 : 0) + (inAuthor ? 1 : 0);
      if (!inTitle && !inCategory && !inIntro && !inAuthor) score += 0.5;
    }
    if (!matchesAll) continue;
    if (tokens.length > 1 && entry.title.includes(phrase)) score += 6;
    hits.push({ post: entry.post, score });
  }
  // Array.prototype.sort is stable, so equal scores stay newest first.
  return hits.sort((a, b) => b.score - a.score);
}

/**
 * Normalised text plus, for each of its characters, the index of the original
 * character it came from, so matches found in the normalised text can be
 * mapped back onto the text as displayed.
 */
function normalizeWithMap(text: string): { normalized: string; map: number[] } {
  let normalized = "";
  const map: number[] = [];
  let offset = 0;
  for (const ch of text) {
    const n = normalize(ch);
    for (let i = 0; i < n.length; i++) map.push(offset);
    normalized += n;
    offset += ch.length;
  }
  map.push(offset);
  return { normalized, map };
}

/** Character ranges in `text` that match a query word at a word start, merged. */
function matchRanges(text: string, tokens: string[]): [number, number][] {
  if (!text || tokens.length === 0) return [];
  const { normalized, map } = normalizeWithMap(text);
  const ranges: [number, number][] = [];
  for (const token of tokens) {
    let at = wordStartIndex(normalized, token);
    while (at !== -1) {
      let end = at + token.length;
      // Never end a highlight halfway through one displayed character.
      while (end < normalized.length && map[end] === map[end - 1]) end++;
      ranges.push([map[at], map[end]]);
      at = wordStartIndex(normalized, token, at + token.length);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  return merged;
}

/** `text` split into plain and matched runs, for rendering highlights. */
export function highlight(text: string, tokens: string[]): TextSegment[] {
  const ranges = matchRanges(text, tokens);
  if (ranges.length === 0) return text ? [{ text, match: false }] : [];
  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false });
    segments.push({ text: text.slice(start, end), match: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });
  return segments;
}

/**
 * A short extract of `text` that contains its first match, starting on a word
 * boundary, so a hit deep in a long introduction is still visible.
 */
export function snippet(text: string, tokens: string[], maxLength = 160): string {
  if (!text) return "";
  const first = matchRanges(text, tokens)[0];
  if (!first || first[0] < maxLength * 0.6) {
    return text.length <= maxLength ? text : `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
  }
  let start = Math.max(0, first[0] - Math.floor(maxLength * 0.3));
  const space = text.lastIndexOf(" ", start);
  if (space > 0 && first[0] - space < maxLength * 0.5) start = space + 1;
  const end = start + maxLength;
  const body = end >= text.length ? text.slice(start) : `${text.slice(start, end).replace(/\s+\S*$/, "")}…`;
  return `…${body}`;
}
