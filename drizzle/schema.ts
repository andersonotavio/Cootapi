import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Notícias e artigos
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  summary: text("summary"),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  category: mysqlEnum("category", ["noticia", "projeto", "materia", "evento"]).default("noticia").notNull(),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  authorId: int("authorId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

// Eventos e calendário
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Documentos para cooperados
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  fileUrl: text("fileUrl").notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: int("fileSize"),
  mimeType: varchar("mimeType", { length: 100 }),
  category: mysqlEnum("category", ["informe", "relatorio", "ata", "contrato", "outro"]).default("outro").notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  uploadedById: int("uploadedById"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

// Informes internos para cooperados
export const informes = mysqlTable("informes", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  videoUrl: text("videoUrl"),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Informe = typeof informes.$inferSelect;
export type InsertInforme = typeof informes.$inferInsert;

// Inscrições de novos cooperados
export const memberApplications = mysqlTable("member_applications", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 14 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  birthDate: varchar("birthDate", { length: 10 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }),
  education: varchar("education", { length: 100 }),
  formation: varchar("formation", { length: 255 }),
  experience: text("experience"),
  motivation: text("motivation"),
  status: mysqlEnum("status", ["pendente", "aprovado", "rejeitado"]).default("pendente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MemberApplication = typeof memberApplications.$inferSelect;
export type InsertMemberApplication = typeof memberApplications.$inferInsert;

// Mensagens de contato
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["servico", "projeto", "parceria", "outro"]).default("outro").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// Galeria de fotos
export const gallery = mysqlTable("gallery", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }),
  imageUrl: text("imageUrl").notNull(),
  fileKey: varchar("fileKey", { length: 512 }),
  caption: text("caption"),
  category: varchar("category", { length: 100 }),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = typeof gallery.$inferInsert;
