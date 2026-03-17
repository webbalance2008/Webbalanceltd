import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function inferBlockType(id: string): ContentBlock["type"] {
  if (/^h1/.test(id)) return "h1";
  if (/^h2|_h2$/.test(id)) return "h2";
  if (/^h3|_h3$/.test(id)) return "h3";
  return "p";
}

export async function saveContentBlocks(
  pagePath: string,
  updates: Map<string, string>
): Promise<{ ok: boolean; error?: string }> {
  const { data, error: fetchError } = await supabase
    .from("pages")
    .select("content_blocks")
    .eq("page_path", pagePath)
    .maybeSingle();

  if (fetchError) return { ok: false, error: fetchError.message };

  const existing: ContentBlock[] = Array.isArray(data?.content_blocks)
    ? (data.content_blocks as ContentBlock[])
    : [];

  const blockMap = new Map<string, ContentBlock>(existing.map((b) => [b.id, b]));
  for (const [id, text] of updates) {
    const prev = blockMap.get(id);
    blockMap.set(id, prev ? { ...prev, text } : { id, type: inferBlockType(id), text });
  }

  const { error: upsertError } = await supabase
    .from("pages")
    .upsert({ page_path: pagePath, content_blocks: Array.from(blockMap.values()) }, { onConflict: "page_path" });

  if (upsertError) return { ok: false, error: upsertError.message };
  return { ok: true };
}

export interface ContentBlock {
  id: string;
  type: "h1" | "h2" | "h3" | "p" | "img";
  text?: string;
  alt?: string;
  src?: string;
}

/**
 * Fetches content_blocks for a given page_path from Supabase.
 * Returns a Map<id, text|alt> for use in page components as overrides.
 * Returns null while loading, empty Map if no data.
 */
export function useContentBlocks(pagePath: string): Map<string, string> | null {
  const [blocks, setBlocks] = useState<Map<string, string> | null>(null);

  useEffect(() => {
    supabase
      .from("pages")
      .select("content_blocks")
      .eq("page_path", pagePath)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content_blocks && Array.isArray(data.content_blocks)) {
          const map = new Map<string, string>();
          for (const b of data.content_blocks as ContentBlock[]) {
            if (b.type === "img" && b.alt !== undefined) {
              map.set(b.id, b.alt);
            } else if (b.text !== undefined) {
              map.set(b.id, b.text);
            }
          }
          setBlocks(map);
        } else {
          setBlocks(new Map());
        }
      });
  }, [pagePath]);

  return blocks;
}
