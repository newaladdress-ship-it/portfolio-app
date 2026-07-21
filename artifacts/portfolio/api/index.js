export default async function handler(req, res) {
  try {
    const appModule = await import("./app.mjs");
    const app = appModule.default;
    return app(req, res);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
}
