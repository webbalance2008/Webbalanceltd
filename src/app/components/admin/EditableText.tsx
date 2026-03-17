import { useRef, useEffect, type ElementType, type CSSProperties } from "react";
import { useEditMode } from "../../contexts/EditModeContext";

const TEAL = "#00d4e8";

interface EditableTextProps {
  blockId: string;
  resolved: string;
  as?: string;
  multiline?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function EditableText({
  blockId,
  resolved,
  as: Tag = "span",
  multiline = false,
  style,
  className,
}: EditableTextProps) {
  const { isEditMode, applyEdit } = useEditMode();

  if (!isEditMode) {
    const El = Tag as ElementType;
    return <El style={style} className={className}>{resolved}</El>;
  }

  return (
    <EditableContent
      blockId={blockId}
      resolved={resolved}
      Tag={Tag}
      multiline={multiline}
      style={style}
      className={className}
      onEdit={applyEdit}
    />
  );
}

// Separate component so useEffect/useRef only mount when in edit mode
function EditableContent({
  blockId,
  resolved,
  Tag,
  multiline,
  style,
  className,
  onEdit,
}: {
  blockId: string;
  resolved: string;
  Tag: string;
  multiline: boolean;
  style?: CSSProperties;
  className?: string;
  onEdit: (id: string, value: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);

  // Set initial text once on mount
  useEffect(() => {
    if (ref.current) ref.current.innerText = resolved;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const El = Tag as ElementType;

  return (
    <El
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className={className}
      style={{
        ...style,
        outline: `2px solid ${TEAL}55`,
        outlineOffset: "2px",
        borderRadius: "2px",
        cursor: "text",
      }}
      onFocus={(e: React.FocusEvent<HTMLElement>) => {
        e.currentTarget.style.outlineColor = TEAL;
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        e.currentTarget.style.outlineColor = `${TEAL}55`;
        onEdit(blockId, e.currentTarget.innerText.trim());
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) e.preventDefault();
      }}
      onPaste={(e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(text));
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }}
    />
  );
}
