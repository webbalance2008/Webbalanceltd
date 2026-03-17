import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "../utils/supabaseClient";
import { saveContentBlocks } from "../hooks/useContentBlocks";

interface EditModeContextValue {
  isEditMode: boolean;
  canEdit: boolean;
  pendingEdits: Map<string, string>;
  isSaving: boolean;
  setEditMode: (on: boolean) => void;
  applyEdit: (blockId: string, value: string) => void;
  discardEdits: () => void;
  publishEdits: (pagePath: string) => Promise<void>;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used inside EditModeProvider");
  return ctx;
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [pendingEdits, setPendingEdits] = useState<Map<string, string>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isDev = !!import.meta.env.VITE_DEV_LOGIN;
    if (isDev) {
      setCanEdit(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setCanEdit(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setCanEdit(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const setEditMode = (on: boolean) => {
    setIsEditMode(on);
    if (!on) setPendingEdits(new Map());
  };

  const applyEdit = (blockId: string, value: string) => {
    setPendingEdits((prev) => {
      const next = new Map(prev);
      next.set(blockId, value);
      return next;
    });
  };

  const discardEdits = () => {
    setPendingEdits(new Map());
    setIsEditMode(false);
  };

  const publishEdits = async (pagePath: string) => {
    if (pendingEdits.size === 0) {
      setIsEditMode(false);
      return;
    }
    setIsSaving(true);
    const result = await saveContentBlocks(pagePath, pendingEdits);
    setIsSaving(false);
    if (result.ok) {
      setPendingEdits(new Map());
      setIsEditMode(false);
    }
  };

  return (
    <EditModeContext.Provider
      value={{ isEditMode, canEdit, pendingEdits, isSaving, setEditMode, applyEdit, discardEdits, publishEdits }}
    >
      {children}
    </EditModeContext.Provider>
  );
}
