import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2962e868/health", (c) => {
  return c.json({ status: "ok" });
});

// ─── Send Email via Resend ──────────────────────────────────────────────────
app.post("/make-server-2962e868/send-email", async (c) => {
  try {
    const body = await c.req.json();
    const { type, data } = body;

    if (!type || !data) {
      return c.json({ error: "Missing required fields: type, data" }, 400);
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.log("ERROR: RESEND_API_KEY is not set in environment variables");
      return c.json({ error: "Email service not configured" }, 500);
    }

    // Build subject and HTML based on form type
    let subject = "";
    let html = "";

    switch (type) {
      case "enquiry": {
        subject = `New Enquiry from ${data.name || "Website Visitor"}`;
        html = `
          <h2>New General Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.name || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.email || "—"}</td></tr>
            ${data.budget ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Budget</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.budget}</td></tr>` : ""}
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.message || "—"}</td></tr>
          </table>
        `;
        break;
      }

      case "support": {
        subject = `Support Request from ${data.name || "Client"}`;
        html = `
          <h2>New Support Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.name || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.email || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Issue</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.issue || "—"}</td></tr>
          </table>
        `;
        break;
      }

      case "start-project": {
        subject = `New Project Brief from ${data.name || "Website Visitor"}`;
        html = `
          <h2>New Project Brief</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.name || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.email || "—"}</td></tr>
            ${data.company ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.company}</td></tr>` : ""}
            ${data.website ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Website</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.website}</td></tr>` : ""}
            ${data.services ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Services</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.services}</td></tr>` : ""}
            ${data.budget ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Budget</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.budget}</td></tr>` : ""}
            ${data.timeline ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Timeline</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.timeline}</td></tr>` : ""}
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Brief</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.brief || "—"}</td></tr>
          </table>
        `;
        break;
      }

      case "web-design-wizard": {
        subject = `Web Design Project from ${data.name || "Website Visitor"}`;
        html = `
          <h2>Web Design Project Wizard Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.name || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.email || "—"}</td></tr>
            ${data.company ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.company}</td></tr>` : ""}
            ${data.website ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Existing Website</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.website}</td></tr>` : ""}
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Website Type</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.websiteType || "—"}</td></tr>
            ${data.goals ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Goals</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.goals}</td></tr>` : ""}
            ${data.branding ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Branding</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.branding}</td></tr>` : ""}
            ${data.pages ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Pages</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.pages}</td></tr>` : ""}
            ${data.features ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Features</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.features}</td></tr>` : ""}
            ${data.hosting ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Hosting</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.hosting}</td></tr>` : ""}
            ${data.timeline ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Timeline</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.timeline}</td></tr>` : ""}
            ${data.paymentPlan ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Payment Plan</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.paymentPlan}</td></tr>` : ""}
            ${data.estimate ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Estimate</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.estimate}</td></tr>` : ""}
            ${data.brief ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Brief</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.brief}</td></tr>` : ""}
          </table>
        `;
        break;
      }

      case "web-app-wizard": {
        subject = `Web App Project from ${data.name || "Website Visitor"}`;
        html = `
          <h2>Web App Project Wizard Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.name || "—"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.email || "—"}</td></tr>
            ${data.company ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.company}</td></tr>` : ""}
            ${data.website ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Existing Website</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.website}</td></tr>` : ""}
            <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">App Type</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.appType || "—"}</td></tr>
            ${data.goals ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Goals</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.goals}</td></tr>` : ""}
            ${data.userScale ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">User Scale</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.userScale}</td></tr>` : ""}
            ${data.coreFeatures ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Core Features</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.coreFeatures}</td></tr>` : ""}
            ${data.dataComplexity ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Data Complexity</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.dataComplexity}</td></tr>` : ""}
            ${data.aiFeatures ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">AI Features</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.aiFeatures}</td></tr>` : ""}
            ${data.buildApproach ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Build Approach</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.buildApproach}</td></tr>` : ""}
            ${data.hosting ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Hosting</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.hosting}</td></tr>` : ""}
            ${data.database ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Database</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.database}</td></tr>` : ""}
            ${data.timeline ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Timeline</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.timeline}</td></tr>` : ""}
            ${data.paymentPlan ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Payment Plan</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.paymentPlan}</td></tr>` : ""}
            ${data.estimate ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Estimate</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.estimate}</td></tr>` : ""}
            ${data.brief ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Brief</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.brief}</td></tr>` : ""}
          </table>
        `;
        break;
      }

      case "packages": {
        subject = `Package Selection from ${data.name || "Website Visitor"}`;
        html = `
          <h2>Package Selection</h2>
          ${data.selections ? `<h3>Selected Packages</h3><ul>${data.selections.map((s: string) => `<li>${s}</li>`).join("")}</ul>` : ""}
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            ${data.oneTimeTotal ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">One-Time Total</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.oneTimeTotal}</td></tr>` : ""}
            ${data.monthlyTotal ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Monthly Total</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.monthlyTotal}</td></tr>` : ""}
          </table>
        `;
        break;
      }

      default:
        return c.json({ error: `Unknown email type: ${type}` }, 400);
    }

    // Send via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Web Balance <contact@web-balance.co.uk>",
        to: ["contact@web-balance.co.uk"],
        subject,
        html,
        reply_to: data.email || undefined,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.log(`Resend API error (${resendResponse.status}): ${errorText}`);
      return c.json(
        { error: `Failed to send email via Resend: ${errorText}` },
        resendResponse.status,
      );
    }

    const result = await resendResponse.json();
    console.log(`Email sent successfully: ${JSON.stringify(result)}`);

    // Also store in KV for record-keeping
    const id = `${type}-${Date.now()}`;
    await kv.set(id, JSON.stringify({ type, data, sentAt: new Date().toISOString() }));

    return c.json({ success: true, id: result.id });
  } catch (err) {
    console.log(`Error in send-email endpoint: ${err}`);
    return c.json({ error: `Server error while sending email: ${String(err)}` }, 500);
  }
});

Deno.serve(app.fetch);