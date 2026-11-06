import type { SeoInput, SeoCheckResult, SeoScoreResult } from './types';

// ─── Text helpers ─────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

function countWords(text: string): string[] {
  return text.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

function sentences(text: string): string[] {
  return text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
}

function paragraphs(text: string): string[] {
  return text.split(/\n{2,}/).map(p => p.trim()).filter(p => p.length > 0);
}

function extractHeadings(html: string): string {
  const matches = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) ?? [];
  return matches.map(h => h.replace(/<[^>]*>/g, '').toLowerCase()).join(' ');
}

const TRANSITION_WORDS = [
  'however', 'therefore', 'furthermore', 'moreover', 'consequently',
  'additionally', 'nevertheless', 'meanwhile', 'subsequently', 'accordingly',
  'although', 'because', 'since', 'while', 'whereas', 'despite', 'unless',
  'thus', 'hence', 'also', 'firstly', 'secondly', 'finally', 'in addition',
  'in contrast', 'as a result', 'for example', 'for instance', 'in conclusion',
];

// ─── Check builders ──────────────────────────────────────────────────────────

function check(
  key: string,
  category: SeoCheckResult['category'],
  label: string,
  status: SeoCheckResult['status'],
  message: string,
  points_possible: number,
): SeoCheckResult {
  const points_earned =
    status === 'pass' ? points_possible :
    status === 'warn' ? Math.round(points_possible * 0.5) :
    0;
  return { key, category, label, status, message, points_earned, points_possible };
}

// ─── Main scorer ─────────────────────────────────────────────────────────────

export function computeSeoScore(input: SeoInput): SeoScoreResult {
  const results: SeoCheckResult[] = [];

  const kw      = (input.focus_keyword ?? '').trim().toLowerCase();
  const title   = (input.title ?? '').toLowerCase();
  const desc    = (input.description ?? '').toLowerCase();
  const path    = (input.page_path ?? '').toLowerCase();
  const hasKw   = kw.length > 0;

  // ── SEO Basics (40 pts) ───────────────────────────────────────────────────

  // Keyword in title (8 pts)
  if (hasKw) {
    results.push(check('kw_in_title', 'basics', 'Keyword in title',
      title.includes(kw) ? 'pass' : 'fail',
      title.includes(kw) ? `"${kw}" found in title` : `Add "${kw}" to your title`,
      8));
  }

  // Keyword in meta description (8 pts)
  if (hasKw) {
    results.push(check('kw_in_description', 'basics', 'Keyword in meta description',
      desc.includes(kw) ? 'pass' : 'fail',
      desc.includes(kw) ? `"${kw}" found in meta description` : `Add "${kw}" to your meta description`,
      8));
  }

  // Title length (7 pts)
  const tLen = (input.title ?? '').length;
  if (tLen === 0) {
    results.push(check('title_length', 'basics', 'Title length', 'fail', 'Title is missing', 7));
  } else if (tLen >= 50 && tLen <= 60) {
    results.push(check('title_length', 'basics', 'Title length', 'pass', `${tLen} chars — perfect (50–60)`, 7));
  } else if (tLen >= 35 && tLen < 50) {
    results.push(check('title_length', 'basics', 'Title length', 'warn', `${tLen} chars — too short, aim for 50–60`, 7));
  } else if (tLen > 60 && tLen <= 70) {
    results.push(check('title_length', 'basics', 'Title length', 'warn', `${tLen} chars — slightly long, aim for 50–60`, 7));
  } else {
    results.push(check('title_length', 'basics', 'Title length', 'fail', `${tLen} chars — ${tLen < 35 ? 'too short' : 'too long'}, aim for 50–60`, 7));
  }

  // Description length (7 pts)
  const dLen = (input.description ?? '').length;
  if (dLen === 0) {
    results.push(check('description_length', 'basics', 'Description length', 'fail', 'Meta description is missing', 7));
  } else if (dLen >= 140 && dLen <= 160) {
    results.push(check('description_length', 'basics', 'Description length', 'pass', `${dLen} chars — perfect (140–160)`, 7));
  } else if (dLen >= 120 && dLen < 140) {
    results.push(check('description_length', 'basics', 'Description length', 'warn', `${dLen} chars — slightly short, aim for 140–160`, 7));
  } else if (dLen > 160 && dLen <= 180) {
    results.push(check('description_length', 'basics', 'Description length', 'warn', `${dLen} chars — slightly long, aim for 140–160`, 7));
  } else {
    results.push(check('description_length', 'basics', 'Description length', 'fail', `${dLen} chars — ${dLen < 120 ? 'too short' : 'too long'}, must be 140–160`, 7));
  }

  // Keyword in URL (5 pts)
  if (hasKw) {
    const kwSlug = kw.replace(/\s+/g, '-');
    const inUrl  = path.includes(kw.replace(/\s+/g, '-')) || path.includes(kw.replace(/\s+/g, ''));
    results.push(check('kw_in_url', 'basics', 'Keyword in URL',
      inUrl ? 'pass' : 'warn',
      inUrl ? 'Focus keyword found in URL' : `Consider including "${kwSlug}" in the page URL`,
      5));
  }

  // OG image present (3 pts)
  results.push(check('og_image', 'basics', 'OG image',
    (input.og_image ?? '').trim().length > 0 ? 'pass' : 'warn',
    (input.og_image ?? '').trim().length > 0 ? 'OG image is set' : 'Add an OG image to improve social sharing',
    3));

  // No-index (2 pts)
  results.push(check('no_index', 'basics', 'Page indexable',
    !input.no_index ? 'pass' : 'fail',
    !input.no_index ? 'Page is visible to search engines' : 'Page is excluded from search engines (no-index)',
    2));

  // ── Content Quality (35 pts) ─ requires body_content ────────────────────

  const rawContent = (input.body_content ?? '').trim();
  const hasContent = rawContent.length > 0;

  if (hasContent) {
    const plainText  = rawContent.startsWith('<') ? stripHtml(rawContent) : rawContent;
    const words      = countWords(plainText);
    const totalWords = words.length;
    const first100   = words.slice(0, 100).join(' ');

    // Keyword in first 100 words (8 pts)
    if (hasKw) {
      const inFirst = first100.includes(kw);
      results.push(check('kw_first_100', 'content', 'Keyword in intro',
        inFirst ? 'pass' : 'warn',
        inFirst ? `"${kw}" appears in the first 100 words` : `Add "${kw}" within the first 100 words`,
        8));
    }

    // Content length (7 pts)
    if (totalWords >= 300) {
      results.push(check('content_length', 'content', 'Content length', 'pass', `${totalWords} words — good length`, 7));
    } else if (totalWords >= 150) {
      results.push(check('content_length', 'content', 'Content length', 'warn', `${totalWords} words — aim for 300+ words`, 7));
    } else {
      results.push(check('content_length', 'content', 'Content length', 'fail', `${totalWords} words — content is too thin (need 300+)`, 7));
    }

    // Keyword in heading (7 pts)
    if (hasKw) {
      const headings = rawContent.startsWith('<') ? extractHeadings(rawContent) : '';
      const inHeading = headings.includes(kw) || plainText.split('\n').some(line =>
        (line.startsWith('#') || line.toUpperCase() === line) && line.toLowerCase().includes(kw)
      );
      results.push(check('kw_in_heading', 'content', 'Keyword in heading',
        inHeading ? 'pass' : 'warn',
        inHeading ? `"${kw}" found in a heading` : `Include "${kw}" in a heading (H1 or H2)`,
        7));
    }

    // Keyword density (7 pts)
    if (hasKw && totalWords > 0) {
      const kwWords   = kw.split(/\s+/);
      let occurrences = 0;
      for (let i = 0; i <= words.length - kwWords.length; i++) {
        if (kwWords.every((w, j) => words[i + j] === w)) occurrences++;
      }
      const density = totalWords > 0 ? (occurrences / totalWords) * 100 : 0;
      if (density >= 1 && density <= 3) {
        results.push(check('kw_density', 'content', 'Keyword density', 'pass', `${density.toFixed(1)}% — good (1–3%)`, 7));
      } else if (density > 3 && density <= 5) {
        results.push(check('kw_density', 'content', 'Keyword density', 'warn', `${density.toFixed(1)}% — slightly high, risk of over-optimisation (aim 1–3%)`, 7));
      } else if (density > 5) {
        results.push(check('kw_density', 'content', 'Keyword density', 'fail', `${density.toFixed(1)}% — over-optimised, reduce keyword usage`, 7));
      } else {
        results.push(check('kw_density', 'content', 'Keyword density', 'fail', `${density.toFixed(1)}% — too low, use "${kw}" more naturally`, 7));
      }
    }

    // Keyword distribution (6 pts) — appears in second half
    if (hasKw && totalWords > 0) {
      const secondHalf = words.slice(Math.floor(totalWords / 2)).join(' ');
      const inSecond   = secondHalf.includes(kw);
      results.push(check('kw_distribution', 'content', 'Keyword distribution',
        inSecond ? 'pass' : 'warn',
        inSecond ? 'Keyword used in both halves of the content' : `Use "${kw}" in the second half of your content too`,
        6));
    }

    // ── Readability (25 pts) ─────────────────────────────────────────────────

    const sentList = sentences(plainText);
    const paraList = paragraphs(rawContent.startsWith('<') ? plainText : rawContent);

    // Avg sentence length (7 pts)
    if (sentList.length > 0) {
      const avgSentWords = Math.round(
        sentList.reduce((acc, s) => acc + wordCount(s), 0) / sentList.length
      );
      if (avgSentWords <= 20) {
        results.push(check('sentence_length', 'readability', 'Sentence length', 'pass', `Avg ${avgSentWords} words per sentence — good`, 7));
      } else if (avgSentWords <= 30) {
        results.push(check('sentence_length', 'readability', 'Sentence length', 'warn', `Avg ${avgSentWords} words — slightly long, aim for under 20`, 7));
      } else {
        results.push(check('sentence_length', 'readability', 'Sentence length', 'fail', `Avg ${avgSentWords} words — sentences too long, break them up`, 7));
      }
    }

    // Paragraph length (6 pts)
    if (paraList.length > 0) {
      const avgParaWords = Math.round(
        paraList.reduce((acc, p) => acc + wordCount(p), 0) / paraList.length
      );
      if (avgParaWords <= 100) {
        results.push(check('paragraph_length', 'readability', 'Paragraph length', 'pass', `Avg ${avgParaWords} words per paragraph — good`, 6));
      } else if (avgParaWords <= 150) {
        results.push(check('paragraph_length', 'readability', 'Paragraph length', 'warn', `Avg ${avgParaWords} words — paragraphs could be shorter`, 6));
      } else {
        results.push(check('paragraph_length', 'readability', 'Paragraph length', 'fail', `Avg ${avgParaWords} words — break paragraphs into shorter sections`, 6));
      }
    }

    // Subheading usage (6 pts) — at least 1 heading per 300 words
    const hasSubheadings =
      rawContent.startsWith('<')
        ? /<h[2-6]/i.test(rawContent)
        : rawContent.split('\n').some(l => l.startsWith('##') || l.startsWith('# '));
    const neededHeadings = Math.max(1, Math.floor(totalWords / 300));
    const headingCount   = rawContent.startsWith('<')
      ? (rawContent.match(/<h[2-6]/gi) ?? []).length
      : rawContent.split('\n').filter(l => l.startsWith('#')).length;
    if (headingCount >= neededHeadings) {
      results.push(check('subheading_usage', 'readability', 'Subheading usage', 'pass', `${headingCount} subheading${headingCount !== 1 ? 's' : ''} — good structure`, 6));
    } else if (hasSubheadings) {
      results.push(check('subheading_usage', 'readability', 'Subheading usage', 'warn', `${headingCount} subheading — add more to break up long sections`, 6));
    } else {
      results.push(check('subheading_usage', 'readability', 'Subheading usage', 'fail', 'No subheadings found — add H2/H3 tags to improve structure', 6));
    }

    // Transition words (6 pts)
    const lowerText     = plainText.toLowerCase();
    const hasTransition = TRANSITION_WORDS.some(w => lowerText.includes(w));
    results.push(check('transition_words', 'readability', 'Transition words',
      hasTransition ? 'pass' : 'warn',
      hasTransition ? 'Transition words found — good for readability' : 'Add transition words (however, therefore, additionally…)',
      6));
  }

  // ── Totals ───────────────────────────────────────────────────────────────

  const byCategory = (cat: SeoCheckResult['category']) => results.filter(r => r.category === cat);
  const sumEarned  = (arr: SeoCheckResult[]) => arr.reduce((a, r) => a + r.points_earned, 0);
  const sumPossible = (arr: SeoCheckResult[]) => arr.reduce((a, r) => a + r.points_possible, 0);

  const basicsChecks      = byCategory('basics');
  const contentChecks     = byCategory('content');
  const readabilityChecks = byCategory('readability');

  const basics_score        = sumEarned(basicsChecks);
  const content_score       = sumEarned(contentChecks);
  const readability_score   = sumEarned(readabilityChecks);
  const basics_possible     = sumPossible(basicsChecks);
  const content_possible    = sumPossible(contentChecks);
  const readability_possible = sumPossible(readabilityChecks);
  const total_possible      = basics_possible + content_possible + readability_possible;
  const total_earned        = basics_score + content_score + readability_score;

  // Normalise to 100
  const total_score = total_possible > 0
    ? Math.round((total_earned / total_possible) * 100)
    : 0;

  // Label — "Incomplete" only when no title and no description are set
  const incomplete = (input.title ?? '').trim().length === 0 && (input.description ?? '').trim().length === 0;
  let label: SeoScoreResult['label'];
  if (incomplete) label = 'Incomplete';
  else if (total_score >= 85) label = 'Good';
  else if (total_score >= 60) label = 'Needs Improvement';
  else label = 'Poor';

  const color =
    label === 'Good' ? '#3dd68c' :
    label === 'Needs Improvement' ? '#f59e6a' :
    label === 'Incomplete' ? 'rgba(255,255,255,0.4)' :
    '#f87171';

  const priority_fixes = results
    .filter(r => r.status === 'fail')
    .sort((a, b) => b.points_possible - a.points_possible);

  const improvements = results
    .filter(r => r.status === 'warn')
    .sort((a, b) => b.points_possible - a.points_possible);

  const good_signals = results.filter(r => r.status === 'pass');

  return {
    total_score,
    basics_score,
    content_score,
    readability_score,
    basics_possible,
    content_possible,
    readability_possible,
    total_possible,
    label,
    color,
    checks: results,
    priority_fixes,
    improvements,
    good_signals,
  };
}

/** Classify a page by SEO score + traffic */
export function classifyPage(seoScore: number, views: number, avgViews: number) {
  const highSeo     = seoScore >= 70;
  const highTraffic = views >= avgViews;
  if (highSeo && highTraffic)  return 'star'        as const;
  if (!highSeo && highTraffic) return 'opportunity'  as const;
  if (highSeo && !highTraffic) return 'hidden-gem'   as const;
  return 'needs-work' as const;
}
