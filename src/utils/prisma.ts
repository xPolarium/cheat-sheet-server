import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
	var prismaClient: PrismaClient | undefined;
}

if (!global.prismaClient) {
	global.prismaClient = new PrismaClient();
}

prisma = global.prismaClient;

export { prisma };
