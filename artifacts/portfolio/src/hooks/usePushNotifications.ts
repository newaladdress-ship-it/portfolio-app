import { useEffect, useRef, useState } from "react";

// VAPID public key is fetched from the server to avoid hardcoding
let cachedVapidKey: string | null = null;

async function getVapidPublicKey(): Promise<string | null> {
  if (cachedVapidKey) return cachedVapidKey;
  try {
    const res = await fetch("/api/push/vapid-key");
    if (!res.ok) return null;
    const data = await res.json();
    cachedVapidKey = data.publicKey || null;
    return cachedVapidKey;
  } catch {
    return null;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function getSessionId(): string {
  let id = sessionStorage.getItem("push_session_id");
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("push_session_id", id);
  }
  return id;
}

export async function notifyAdmin(title: string, body: string, url?: string, tag?: string) {
  try {
    await fetch("/api/push/notify-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, url, tag }),
    });
  } catch {}
}

export async function notifyVisitors(title: string, body: string, url?: string, sessionId?: string) {
  try {
    await fetch("/api/push/notify-visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, url, sessionId }),
    });
  } catch {}
}

export function usePushNotifications(role: "admin" | "visitor" = "visitor") {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const subscribed = useRef(false);

  const subscribe = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setPermission("unsupported");
      return;
    }
    try {
      const vapidKey = await getVapidPublicKey();
      if (!vapidKey) {
        console.warn("[push] VAPID public key not available");
        return;
      }

      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return;

      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey) as BufferSource,
        });
      }

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: sub.toJSON(),
          role,
          sessionId: getSessionId(),
        }),
      });
      subscribed.current = true;
    } catch (err) {
      console.warn("[push] subscription failed:", err);
    }
  };

  useEffect(() => {
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
    if (Notification.permission === "granted" && !subscribed.current) {
      subscribe();
    }
  }, []);

  return { permission, subscribe };
}
