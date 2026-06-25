CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255),
	`message` text NOT NULL,
	`type` enum('servico','projeto','parceria','outro') NOT NULL DEFAULT 'outro',
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`fileUrl` text NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileSize` int,
	`mimeType` varchar(100),
	`category` enum('informe','relatorio','ata','contrato','outro') NOT NULL DEFAULT 'outro',
	`isPublic` boolean NOT NULL DEFAULT false,
	`uploadedById` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`location` varchar(255),
	`startDate` timestamp NOT NULL,
	`endDate` timestamp,
	`isPublic` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`imageUrl` text NOT NULL,
	`fileKey` varchar(512),
	`caption` text,
	`category` varchar(100),
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `informes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`imageUrl` text,
	`videoUrl` text,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `informes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `member_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`cpf` varchar(14),
	`email` varchar(320),
	`phone` varchar(20),
	`birthDate` varchar(10),
	`address` text,
	`city` varchar(100),
	`state` varchar(2),
	`education` varchar(100),
	`formation` varchar(255),
	`experience` text,
	`motivation` text,
	`status` enum('pendente','aprovado','rejeitado') NOT NULL DEFAULT 'pendente',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `member_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`summary` text,
	`content` text NOT NULL,
	`imageUrl` text,
	`category` enum('noticia','projeto','materia','evento') NOT NULL DEFAULT 'noticia',
	`published` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`authorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`),
	CONSTRAINT `news_slug_unique` UNIQUE(`slug`)
);
