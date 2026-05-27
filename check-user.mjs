import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const { PrismaClient } = await import("@prisma/client");
const p = new PrismaClient();
try {
  const users = await p.user.findMany({ select: { id: true, email: true, role: true } });
  console.log(JSON.stringify(users, null, 2));
  const accts = await p.account.findMany({ select: { userId: true, providerId: true, password: { take: 40 } } });
  console.log("Accounts:", JSON.stringify(accts, null, 2));
} catch (e) {
  console.error(e.message);
} finally {
  await p.$disconnect();
}
