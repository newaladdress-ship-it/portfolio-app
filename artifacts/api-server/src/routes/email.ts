import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const ADMIN_EMAIL = "mi6062610@gmail.com";
const ADMIN_NAME = "Muhammad Imran";

function createTransport() {
  const user = process.env["GMAIL_USER"] || ADMIN_EMAIL;
  const pass = process.env["GMAIL_APP_PASSWORD"];
  if (!pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function formatTranscript(messages: { role: string; content: string }[]): string {
  return messages
    .map(m => {
      const speaker = m.role === "assistant" ? "SmartTalk AI" : "User";
      return `${speaker}:\n${m.content}`;
    })
    .join("\n\n---\n\n");
}

router.post("/smarttalk/send-email", async (req, res) => {
  try {
    const { name, email, messages, leadAnswers, sessionId } = req.body as {
      name: string;
      email: string;
      messages: { role: string; content: string }[];
      leadAnswers: string[];
      sessionId?: string;
    };

    if (!name || !email || !messages) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const transcript = formatTranscript(messages);
    const leadSection = leadAnswers && leadAnswers.length > 0
      ? `\n\nCONSULTATION ANSWERS:\n${leadAnswers.map((a, i) => `Q${i + 1}: ${a}`).join("\n")}`
      : "";

    const adminSubject = `New SmartTalk Lead: ${name} <${email}>`;
    const adminBody = `You have a new project enquiry from your portfolio SmartTalk AI.\n\nCLIENT DETAILS:\nName: ${name}\nEmail: ${email}\nSession ID: ${sessionId || "N/A"}${leadSection}\n\nFULL CHAT TRANSCRIPT:\n\n${transcript}\n\n---\nSent automatically from imrandigitals.online`;

    const userSubject = `Your SmartTalk consultation with ${ADMIN_NAME}`;
    const userBody = `Hi ${name},\n\nThank you for reaching out through SmartTalk AI on imrandigitals.online!\n\nYour consultation has been received and ${ADMIN_NAME} will review your project requirements and get back to you shortly.\n\nHere is a copy of your consultation transcript:\n\n${transcript}\n\n---\nBest regards,\n${ADMIN_NAME}\nWeb App Developer · imrandigitals.online\nWhatsApp: +92 334 563 6230`;

    const transport = createTransport();
    if (transport) {
      await Promise.allSettled([
        transport.sendMail({
          from: `"SmartTalk AI" <${process.env["GMAIL_USER"] || ADMIN_EMAIL}>`,
          to: ADMIN_EMAIL,
          subject: adminSubject,
          text: adminBody,
        }),
        transport.sendMail({
          from: `"${ADMIN_NAME} Portfolio" <${process.env["GMAIL_USER"] || ADMIN_EMAIL}>`,
          to: email,
          subject: userSubject,
          text: userBody,
        }),
      ]);
    } else {
      console.warn("[email] GMAIL_APP_PASSWORD not set – email not sent, data saved to Firestore only.");
    }

    res.json({ success: true });
  } catch (err) {
    console.error("[send-email] error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

router.post("/admin/reply-email", async (req, res) => {
  try {
    const { userEmail, userName, replyMessage, originalMessage } = req.body as {
      userEmail: string;
      userName: string;
      replyMessage: string;
      originalMessage?: string;
    };

    if (!userEmail || !replyMessage) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const subject = `Re: Your SmartTalk consultation — Reply from ${ADMIN_NAME}`;
    const body = `Hi ${userName || "there"},\n\n${replyMessage}${originalMessage ? `\n\n---\nYour original message:\n${originalMessage}` : ""}\n\n---\nBest regards,\n${ADMIN_NAME}\nWeb App Developer · imrandigitals.online\nWhatsApp: +92 334 563 6230`;

    const transport = createTransport();
    if (!transport) {
      res.status(503).json({ error: "Email service not configured. Please set GMAIL_APP_PASSWORD." });
      return;
    }

    await transport.sendMail({
      from: `"${ADMIN_NAME}" <${process.env["GMAIL_USER"] || ADMIN_EMAIL}>`,
      to: userEmail,
      subject,
      text: body,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("[reply-email] error:", err);
    res.status(500).json({ error: "Failed to send reply" });
  }
});

export default router;
