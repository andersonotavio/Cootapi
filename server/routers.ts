import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import {
  news, events, documents, informes, memberApplications, contactMessages, gallery,
  type InsertNews, type InsertEvent, type InsertDocument, type InsertInforme,
  type InsertMemberApplication, type InsertContactMessage, type InsertGallery,
} from "../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { storagePut, storageGet } from "./storage";
import { nanoid } from "nanoid";

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito a administradores." });
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // News router
  news: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(10), offset: z.number().default(0), published: z.boolean().optional(), category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [];
        if (input?.published !== undefined) conditions.push(eq(news.published, input.published));
        if (input?.category) conditions.push(eq(news.category, input.category as any));
        const result = await db.select().from(news)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(desc(news.publishedAt))
          .limit(input?.limit ?? 10)
          .offset(input?.offset ?? 0);
        return result;
      }),

    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(news).where(eq(news.slug, input.slug)).limit(1);
        return result[0] ?? null;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        summary: z.string().optional(),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
        category: z.enum(["noticia", "projeto", "materia", "evento"]).default("noticia"),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(news).values({
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.published ? new Date() : undefined,
        });
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        summary: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.enum(["noticia", "projeto", "materia", "evento"]).optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...data } = input;
        const updateData: any = { ...data };
        if (data.published) updateData.publishedAt = new Date();
        await db.update(news).set(updateData).where(eq(news.id, id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(news).where(eq(news.id, input.id));
        return { success: true };
      }),
  }),

  // Events router
  events: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(20), publicOnly: z.boolean().default(true) }).optional())
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [];
        if (input?.publicOnly && !ctx.user) conditions.push(eq(events.isPublic, true));
        const result = await db.select().from(events)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(events.startDate)
          .limit(input?.limit ?? 20);
        return result;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        location: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        isPublic: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(events).values(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        isPublic: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...data } = input;
        await db.update(events).set(data).where(eq(events.id, id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(events).where(eq(events.id, input.id));
        return { success: true };
      }),
  }),

  // Documents router
  documents: router({
    list: protectedProcedure
      .input(z.object({ category: z.string().optional(), limit: z.number().default(20) }).optional())
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [];
        if (ctx.user.role !== "admin") conditions.push(eq(documents.isPublic, true));
        if (input?.category) conditions.push(eq(documents.category, input.category as any));
        const result = await db.select().from(documents)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(desc(documents.createdAt))
          .limit(input?.limit ?? 20);
        return result;
      }),

    getDownloadUrl: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.select().from(documents).where(eq(documents.id, input.id)).limit(1);
        const doc = result[0];
        if (!doc) throw new TRPCError({ code: "NOT_FOUND" });
        if (!doc.isPublic && ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const { url } = await storageGet(doc.fileKey);
        return { url };
      }),

    getUploadUrl: adminProcedure
      .input(z.object({ fileName: z.string(), mimeType: z.string() }))
      .mutation(async ({ input }) => {
        const key = `documents/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(key, Buffer.from(""), input.mimeType);
        return { key, uploadUrl: url };
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        fileUrl: z.string(),
        fileKey: z.string(),
        fileName: z.string(),
        fileSize: z.number().optional(),
        mimeType: z.string().optional(),
        category: z.enum(["informe", "relatorio", "ata", "contrato", "outro"]).default("outro"),
        isPublic: z.boolean().default(false),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(documents).values({ ...input, uploadedById: ctx.user.id });
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(documents).where(eq(documents.id, input.id));
        return { success: true };
      }),

    // Upload for cooperados (base64 upload)
    upload: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.enum(["informe", "relatorio", "ata", "contrato", "outro"]).default("outro"),
        isPublic: z.boolean().default(false),
        fileName: z.string(),
        fileSize: z.number().optional(),
        mimeType: z.string().optional(),
        fileData: z.string(), // base64
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const key = `documents/cooperados/${ctx.user.id}/${nanoid()}-${input.fileName}`;
        const buffer = Buffer.from(input.fileData, "base64");
        const { url } = await storagePut(key, buffer, input.mimeType ?? "application/octet-stream");
        await db.insert(documents).values({
          title: input.title,
          description: input.description,
          fileUrl: url,
          fileKey: key,
          fileName: input.fileName,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          category: input.category,
          isPublic: input.isPublic,
          uploadedById: ctx.user.id,
        });
        return { success: true };
      }),
  }),

  // Informes router
  informes: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(10) }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const result = await db.select().from(informes)
          .where(eq(informes.published, true))
          .orderBy(desc(informes.createdAt))
          .limit(input?.limit ?? 10);
        return result;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        published: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(informes).values(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...data } = input;
        await db.update(informes).set(data).where(eq(informes.id, id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(informes).where(eq(informes.id, input.id));
        return { success: true };
      }),
  }),

  // Member applications router
  memberApplications: router({
    create: publicProcedure
      .input(z.object({
        fullName: z.string().min(1),
        cpf: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        birthDate: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        education: z.string().optional(),
        formation: z.string().optional(),
        experience: z.string().optional(),
        motivation: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(memberApplications).values(input);
        return { success: true };
      }),

    list: adminProcedure
      .input(z.object({ status: z.string().optional(), limit: z.number().default(20) }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [];
        if (input?.status) conditions.push(eq(memberApplications.status, input.status as any));
        const result = await db.select().from(memberApplications)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(desc(memberApplications.createdAt))
          .limit(input?.limit ?? 20);
        return result;
      }),

    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["pendente", "aprovado", "rejeitado"]) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(memberApplications).set({ status: input.status }).where(eq(memberApplications.id, input.id));
        return { success: true };
      }),
  }),

  // Contact messages router
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10),
        type: z.enum(["servico", "projeto", "parceria", "outro"]).default("outro"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(contactMessages).values(input);
        return { success: true };
      }),

    list: adminProcedure
      .input(z.object({ read: z.boolean().optional(), limit: z.number().default(20) }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [];
        if (input?.read !== undefined) conditions.push(eq(contactMessages.read, input.read));
        const result = await db.select().from(contactMessages)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(desc(contactMessages.createdAt))
          .limit(input?.limit ?? 20);
        return result;
      }),

    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, input.id));
        return { success: true };
      }),
  }),

  // Gallery router
  gallery: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional(), limit: z.number().default(20) }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [eq(gallery.published, true)];
        if (input?.category) conditions.push(eq(gallery.category, input.category));
        const result = await db.select().from(gallery)
          .where(and(...conditions))
          .orderBy(desc(gallery.createdAt))
          .limit(input?.limit ?? 20);
        return result;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().optional(),
        imageUrl: z.string(),
        fileKey: z.string().optional(),
        caption: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(gallery).values(input);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(gallery).where(eq(gallery.id, input.id));
        return { success: true };
      }),
  }),

  // File upload for cooperados
  upload: router({
    getUploadUrl: protectedProcedure
      .input(z.object({ fileName: z.string(), mimeType: z.string(), folder: z.string().default("uploads") }))
      .mutation(async ({ input, ctx }) => {
        const key = `${input.folder}/${ctx.user.id}/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(key, Buffer.from(""), input.mimeType);
        return { key, uploadUrl: url };
      }),
  }),

  // Admin stats
  admin: router({
    stats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { news: 0, events: 0, documents: 0, applications: 0, messages: 0 };
      const [newsCount, eventsCount, docsCount, appsCount, msgsCount] = await Promise.all([
        db.select({ count: sql<number>`count(*)` }).from(news),
        db.select({ count: sql<number>`count(*)` }).from(events),
        db.select({ count: sql<number>`count(*)` }).from(documents),
        db.select({ count: sql<number>`count(*)` }).from(memberApplications),
        db.select({ count: sql<number>`count(*)` }).from(contactMessages).where(eq(contactMessages.read, false)),
      ]);
      return {
        news: Number(newsCount[0]?.count ?? 0),
        events: Number(eventsCount[0]?.count ?? 0),
        documents: Number(docsCount[0]?.count ?? 0),
        applications: Number(appsCount[0]?.count ?? 0),
        unreadMessages: Number(msgsCount[0]?.count ?? 0),
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
