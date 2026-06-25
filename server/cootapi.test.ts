import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock DB ──────────────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue([{ insertId: 1 }]),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    execute: vi.fn().mockResolvedValue([]),
    then: vi.fn().mockResolvedValue([]),
  }),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

// ─── Context helpers ──────────────────────────────────────────────────────────
function makePublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function makeUserCtx(role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ─── Auth Tests ────────────────────────────────────────────────────────────────
describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user object for authenticated users", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.email).toBe("test@example.com");
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = makeUserCtx();
    const clearedCookies: string[] = [];
    ctx.res.clearCookie = (name: string) => { clearedCookies.push(name); };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
    expect(clearedCookies.length).toBeGreaterThan(0);
  });
});

// ─── Contact Tests ─────────────────────────────────────────────────────────────
describe("contact.send", () => {
  it("requires name, email, and message", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.contact.send({ name: "", email: "test@test.com", message: "Hello", type: "contato" })
    ).rejects.toThrow();
  });

  it("requires valid email format", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.contact.send({ name: "Test", email: "not-an-email", message: "Hello", type: "contato" })
    ).rejects.toThrow();
  });
});

// ─── Member Applications Tests ─────────────────────────────────────────────────
describe("memberApplications.submit", () => {
  it("requires fullName, email, and phone", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.memberApplications.submit({ fullName: "", email: "test@test.com", phone: "(86) 99999-9999" })
    ).rejects.toThrow();
  });
});

// ─── Admin Protection Tests ────────────────────────────────────────────────────
describe("admin procedures", () => {
  it("admin.stats requires authentication", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.admin.stats()).rejects.toThrow();
  });

  it("admin.stats requires admin role", async () => {
    const caller = appRouter.createCaller(makeUserCtx("user"));
    await expect(caller.admin.stats()).rejects.toThrow();
  });
});

// ─── Events Tests ──────────────────────────────────────────────────────────────
describe("events.create", () => {
  it("requires admin role", async () => {
    const caller = appRouter.createCaller(makeUserCtx("user"));
    await expect(
      caller.events.create({ title: "Test Event", startDate: new Date() })
    ).rejects.toThrow();
  });

  it("requires authentication", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.events.create({ title: "Test Event", startDate: new Date() })
    ).rejects.toThrow();
  });
});

// ─── Documents Tests ───────────────────────────────────────────────────────────
describe("documents.list", () => {
  it("requires authentication", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.documents.list()).rejects.toThrow();
  });
});

// ─── Informes Tests ────────────────────────────────────────────────────────────
describe("informes.list", () => {
  it("requires authentication", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.informes.list()).rejects.toThrow();
  });
});
