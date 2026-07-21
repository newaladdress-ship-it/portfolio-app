import { Router } from "express";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const router = Router();

const ADMIN_EMAIL = "mi6062610@gmail.com";
const ADMIN_NAME = "Muhammad Imran";

async function sendMailHelper(options: {
  fromName: string;
  to: string;
  subject: string;
  text: string;
}) {
  const resendApiKey = process.env["RESEND_API_KEY"];
  let resendFailed = false;
  
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env["SENDER_EMAIL"] || "noreply@imrandigitals.online";
      
      console.log(`[email] Trying Resend from ${fromEmail} to ${options.to}`);
      const result = await resend.emails.send({
        from: `"${options.fromName}" <${fromEmail}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: `<pre style="font-family: monospace; white-space: pre-wrap; word-wrap: break-word;">${options.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
      });

      if (result.error) {
        console.error("[email] Resend error:", result.error);
        resendFailed = true;
      } else {
        console.log("[email] Resend send succeeded.");
        return true;
      }
    } catch (err) {
      console.error("[email] Resend exception:", err);
      resendFailed = true;
    }
  }

  // Fallback to Nodemailer Gmail SMTP
  const user = process.env["GMAIL_USER"] || ADMIN_EMAIL;
  const pass = process.env["GMAIL_APP_PASSWORD"];
  if (!pass) {
    if (resendFailed) {
      throw new Error("Resend failed, and SMTP GMAIL_APP_PASSWORD is not configured as fallback");
    } else {
      throw new Error("No email service configured (set RESEND_API_KEY or GMAIL_APP_PASSWORD)");
    }
  }

  console.log(`[email] Trying Nodemailer SMTP from ${user} to ${options.to}`);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transport.sendMail({
    from: `"${options.fromName}" <${user}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
  console.log("[email] Nodemailer SMTP send succeeded.");
  return true;
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

    await Promise.allSettled([
      sendMailHelper({
        fromName: "SmartTalk AI",
        to: ADMIN_EMAIL,
        subject: adminSubject,
        text: adminBody,
      }),
      sendMailHelper({
        fromName: `${ADMIN_NAME} Portfolio`,
        to: email,
        subject: userSubject,
        text: userBody,
      }),
    ]);

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

    await sendMailHelper({
      fromName: ADMIN_NAME,
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
