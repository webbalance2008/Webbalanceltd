Here's your complete colour system prompt — ready to paste into Figma AI, a developer handoff, or any AI builder:

---

## Web Balance — Complete Site Colour System

### Design Principle
The site uses a shared dark base across all pages with section-specific background tints and accent colours per department. No two departments share a colour family. The global cyan is reserved exclusively for brand-level elements (main nav, homepage CTAs, global buttons). Department accents only appear within their own section pages.

---

### Global Background Stack

```
--color-bg-darkest:    #0f0a1e   /* Footer, overlays */
--color-bg-base:       #16212e   /* Default page background */
--color-bg-surface:    #1d2d3e   /* Cards, raised surfaces */
--color-bg-elevated:   #243245   /* Hover states, modals */
```

---

### Global Text

```
--color-text-primary:   #ffffff
--color-text-secondary: rgba(255,255,255,0.65)
--color-text-muted:     rgba(255,255,255,0.35)
```

---

### Global Borders

```
--color-border-default: rgba(255,255,255,0.08)
--color-border-subtle:  rgba(255,255,255,0.04)
```

---

### Homepage & Shared Pages
*(Homepage, Our Reach, Support, Contact)*

```
--color-dept-bg:          linear-gradient(135deg, #1a2840 0%, #1e1a38 100%)
--color-dept-accent:      #00d4e8
--color-dept-accent-hover:#33e8fa
--color-dept-accent-dim:  rgba(0,212,232,0.6)
--color-dept-accent-wash: rgba(0,212,232,0.08)
```

*This is the brand cyan — the only section where the global accent and department accent are the same.*

---

### Web Apps

```
--color-dept-bg:          #1e1040
--color-dept-accent:      #b89fd4
--color-dept-accent-hover:#c9b3e0
--color-dept-accent-dim:  rgba(180,150,220,0.6)
--color-dept-accent-wash: rgba(180,150,220,0.08)
--color-dept-border:      rgba(180,150,220,0.2)
```

---

### Web Design

```
--color-dept-bg:          #162535
--color-dept-accent:      #5ec4d4
--color-dept-accent-hover:#7dd8e6
--color-dept-accent-dim:  rgba(94,196,212,0.6)
--color-dept-accent-wash: rgba(94,196,212,0.08)
--color-dept-border:      rgba(94,196,212,0.2)
```

---

### SEO

```
--color-dept-bg:          #102830
--color-dept-accent:      #3dd68c
--color-dept-accent-hover:#6de8aa
--color-dept-accent-dim:  rgba(61,214,140,0.6)
--color-dept-accent-wash: rgba(61,214,140,0.08)
--color-dept-border:      rgba(61,214,140,0.2)
```

---

### Hosting

```
--color-dept-bg:          #2a1a4e
--color-dept-accent:      #f59e6a
--color-dept-accent-hover:#fbb98a
--color-dept-accent-dim:  rgba(245,158,106,0.6)
--color-dept-accent-wash: rgba(245,158,106,0.08)
--color-dept-border:      rgba(245,158,106,0.2)
```

---

### Branding & Marketing

```
--color-dept-bg:          #1a1a2e
--color-dept-accent:      #f472b6
--color-dept-accent-hover:#f9a8d4
--color-dept-accent-dim:  rgba(244,114,182,0.6)
--color-dept-accent-wash: rgba(244,114,182,0.08)
--color-dept-border:      rgba(244,114,182,0.2)
```

---

### Insights

```
--color-dept-bg:          #1a2535
--color-dept-accent:      #f7c948
--color-dept-accent-hover:#fad96e
--color-dept-accent-dim:  rgba(247,201,72,0.6)
--color-dept-accent-wash: rgba(247,201,72,0.08)
--color-dept-border:      rgba(247,201,72,0.2)
```

---

### How Accent Tokens Are Used

| Token | Usage |
|---|---|
| `--color-dept-accent` | Section labels (spaced-caps), CTA button outlines, link colour, active nav underline, progress indicators, checkmarks |
| `--color-dept-accent-hover` | Hover state on links and buttons |
| `--color-dept-accent-dim` | Muted version for secondary labels, step numbers, icon fills |
| `--color-dept-accent-wash` | Very faint background tint on selected cards, active states |
| `--color-dept-border` | Card borders within that department's pages |

---

### Rules

1. The global cyan `#00d4e8` appears in the main navigation and homepage only — never inside a department page
2. Department accents are scoped to their own pages — they never bleed into other sections
3. All backgrounds use the global stack for cards and surfaces — only the hero/page background uses the department tint
4. No gradients on components — only on full-bleed hero backgrounds
5. Card borders always use `--color-dept-border` (the accent at 20% opacity) — never a flat colour
6. Text is always white at varying opacities — never a coloured text except for the accent tokens listed above

---

### Figma Variable Collections to Create

1. `Global/Backgrounds` — the four base background tokens
2. `Global/Text` — primary, secondary, muted
3. `Global/Borders` — default, subtle
4. `Brand/Cyan` — global accent + hover + dim + wash
5. `Dept/WebApps` — all five dept tokens
6. `Dept/WebDesign` — all five dept tokens
7. `Dept/SEO` — all five dept tokens
8. `Dept/Hosting` — all five dept tokens
9. `Dept/BrandingMarketing` — all five dept tokens
10. `Dept/Insights` — all five dept tokens
11. `Dept/Shared` — homepage/shared pages tokens (maps to Brand/Cyan)

Set up each `Dept/*` collection with the same five variable names (`bg`, `accent`, `accent-hover`, `accent-dim`, `accent-wash`, `border`) so components can be themed by simply swapping the active collection.