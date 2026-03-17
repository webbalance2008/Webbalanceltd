import { createPortal } from "react-dom";
import { useEditMode } from "../../contexts/EditModeContext";
import { useLocation } from "react-router";

const TEAL = "#00d4e8";
const BG = "#0e1822";
const BORDER = "rgba(255,255,255,0.08)";
const MONO = "'DM Mono', monospace";

export function AdminBar() {
  const { isEditMode, canEdit, pendingEdits, isSaving, setEditMode, discardEdits, publishEdits } = useEditMode();
  const { pathname } = useLocation();

  if (!canEdit) return null;

  const dirty = pendingEdits.size > 0;
  const changeCount = pendingEdits.size;

  const pillStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: "0.625rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    borderRadius: "999px",
    padding: "0.35em 1em",
    cursor: "pointer",
    border: "1px solid",
    transition: "all 0.2s ease",
  };

  const bar = (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.6rem 1rem",
        background: BG,
        border: `1px solid ${BORDER}`,
        borderRadius: "999px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        fontFamily: MONO,
        fontSize: "0.625rem",
        letterSpacing: "0.18em",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {isSaving ? (
        <>
          <Spinner />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>SAVING…</span>
        </>
      ) : !isEditMode ? (
        <button
          type="button"
          onClick={() => setEditMode(true)}
          style={{
            ...pillStyle,
            color: TEAL,
            background: "transparent",
            borderColor: `${TEAL}55`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = TEAL;
            e.currentTarget.style.background = `${TEAL}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${TEAL}55`;
            e.currentTarget.style.background = "transparent";
          }}
        >
          Edit Page
        </button>
      ) : (
        <>
          {dirty ? (
            <span style={{ color: TEAL }}>
              ● {changeCount} change{changeCount !== 1 ? "s" : ""}
            </span>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Editing</span>
          )}

          {dirty && (
            <button
              type="button"
              onClick={() => publishEdits(pathname)}
              style={{
                ...pillStyle,
                color: "#16212e",
                background: TEAL,
                borderColor: TEAL,
              }}
            >
              Publish
            </button>
          )}

          <button
            type="button"
            onClick={discardEdits}
            style={{
              ...pillStyle,
              color: "rgba(255,255,255,0.45)",
              background: "transparent",
              borderColor: "rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            }}
          >
            {dirty ? "Cancel" : "Stop"}
          </button>
        </>
      )}
    </div>
  );

  return createPortal(bar, document.body);
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={TEAL}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
