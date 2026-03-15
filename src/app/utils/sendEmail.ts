import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2962e868/send-email`;

export async function sendEmail(
  type: string,
  data: Record<string, unknown>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ type, data }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`Email send failed (${response.status}):`, result);
      return { success: false, error: result.error || "Failed to send email" };
    }

    return { success: true };
  } catch (err) {
    console.error("Network error sending email:", err);
    return { success: false, error: "Network error — please try again" };
  }
}
