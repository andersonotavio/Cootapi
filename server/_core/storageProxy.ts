import type { Express } from "express";
import path from "path";
import fs from "fs";
import { ENV } from "./env";

// Local fallback dir for when Forge storage isn't configured (e.g. running
// outside the Manus platform). Assets placed in client/public/manus-storage
// are served directly so /manus-storage/* paths keep working offline.
const LOCAL_STORAGE_DIR = path.resolve(
  process.cwd(),
  "client",
  "public",
  "manus-storage",
);

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      // Forge not configured: try to serve a locally bundled copy.
      const safeKey = path.normalize(key).replace(/^(\.\.(\/|\\|$))+/, "");
      const localPath = path.join(LOCAL_STORAGE_DIR, safeKey);
      if (
        localPath.startsWith(LOCAL_STORAGE_DIR) &&
        fs.existsSync(localPath) &&
        fs.statSync(localPath).isFile()
      ) {
        res.sendFile(localPath);
        return;
      }
      res.status(500).send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}
