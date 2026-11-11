import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";

const authUrl = process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000");

if (!authUrl) {
  throw new Error("BETTER_AUTH_URL must be set in production.");
}

export const auth = betterAuth({
  baseURL: authUrl,
  database: prismaAdapter(prisma, { provider: "mysql" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [authUrl],
});
