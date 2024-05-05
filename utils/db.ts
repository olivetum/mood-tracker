import { PrismaClient } from "@prisma/client";
import {fieldEncryptionExtension} from "prisma-field-encryption";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    }).$extends(fieldEncryptionExtension())


if (process.env.NODE_ENV != 'production') globalForPrisma.prisma = prisma
