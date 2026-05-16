import { Router } from "express";
import webpush from "web-push";

const router = Router();

const VAPID_PUBLIC_KEY = process.env["VAPID_PUBLIC_KEY"] || "";
const VAPID_PRIVATE_KEY = process.env["VAPID_PRIVATE_KEY"] || "";
const VAPID_EMAIL = process.env["VAPID_EMAIL"] || "mailto:mi6062610@gmail.com";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

type Role = "admin" | "visitor";
interface StoredSub {
  subscription: webpush.PushSubscription;
  role: Role;
  sessionId: string;
}

const subscriptions = new Map<string, StoredSub>();

function cleanKey(sub: webpush.PushSubscription) {
  return sub.endpoint;
}

async function sendPush(stored: StoredSub, payload: object) {
  try {
    await webpush.sendNotification(stored.subscription, JSON.stringify(payload));
  } catch (err: unknown) {
    if (err instanceof Error && "statusCode" in err) {
      const code = (err as { statusCode: number }).statusCode;
      if (code === 404 || code === 410) {
        subscriptions.delete(cleanKey(stored.subscription));
      }
    }
  }
}

router.get("/push/vapid-key", (_req, res) => {
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

router.post("/push/subscribe", (req, res) => {
  const { subscription, role, sessionId } = req.body as {
    subscription: webpush.PushSubscription;
    role: Role;
    sessionId: string;
  };
  if (!subscription?.endpoint) {
    res.status(400).json({ error: "Invalid subscription" });
    return;
  }
  subscriptions.set(cleanKey(subscription), { subscription, role: role || "visitor", sessionId });
  res.json({ success: true, total: subscriptions.size });
});

router.post("/push/unsubscribe", (req, res) => {
  const { endpoint } = req.body as { endpoint: string };
  subscriptions.delete(endpoint);
  res.json({ success: true });
});

router.post("/push/notify-admin", async (req, res) => {
  const { title, body, url, tag } = req.body as {
    title: string; body: string; url?: string; tag?: string;
  };
  if (!VAPID_PUBLIC_KEY) { res.status(503).json({ error: "Push not configured" }); return; }

  const payload = { title, body, url: url || "/admin", tag: tag || "admin-notif", icon: "/icon-192.png", badge: "/icon-192.png" };
  const admins = [...subscriptions.values()].filter(s => s.role === "admin");
  await Promise.allSettled(admins.map(s => sendPush(s, payload)));
  res.json({ success: true, sent: admins.length });
});

router.post("/push/notify-visitors", async (req, res) => {
  const { title, body, url, tag, sessionId } = req.body as {
    title: string; body: string; url?: string; tag?: string; sessionId?: string;
  };
  if (!VAPID_PUBLIC_KEY) { res.status(503).json({ error: "Push not configured" }); return; }

  const payload = { title, body, url: url || "/", tag: tag || "reply-notif", icon: "/icon-192.png", badge: "/icon-192.png" };

  let targets = [...subscriptions.values()].filter(s => s.role === "visitor");
  if (sessionId) {
    const specific = targets.find(s => s.sessionId === sessionId);
    if (specific) targets = [specific];
  }

  await Promise.allSettled(targets.map(s => sendPush(s, payload)));
  res.json({ success: true, sent: targets.length });
});

export default router;
