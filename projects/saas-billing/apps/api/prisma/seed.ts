import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("03101812@", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@saas.local" },
    update: {},
    create: {
      email: "admin@saas.local",
      name: "Admin SaaS",
      role: "ADMIN",
      passwordHash,
    },
  });

  const starter = await prisma.plan.upsert({
    where: { id: "starter-plan" },
    update: {},
    create: {
      id: "starter-plan",
      name: "Starter",
      description: "Ideal para equipas pequenas",
      priceCents: 2900,
      interval: "MONTHLY",
      active: true,
    },
  });

  const scale = await prisma.plan.upsert({
    where: { id: "scale-plan" },
    update: {},
    create: {
      id: "scale-plan",
      name: "Scale",
      description: "Para crescimento com automações",
      priceCents: 9900,
      interval: "MONTHLY",
      active: true,
    },
  });

  const enterprise = await prisma.plan.upsert({
    where: { id: "enterprise-plan" },
    update: {},
    create: {
      id: "enterprise-plan",
      name: "Enterprise",
      description: "Contas enterprise com SLA dedicado",
      priceCents: 24900,
      interval: "MONTHLY",
      active: true,
    },
  });

  const subscription = await prisma.subscription.upsert({
    where: { id: "admin-subscription" },
    update: {},
    create: {
      id: "admin-subscription",
      userId: admin.id,
      planId: starter.id,
      status: "ACTIVE",
    },
  });

  await prisma.invoice.upsert({
    where: { id: "invoice-001" },
    update: {},
    create: {
      id: "invoice-001",
      userId: admin.id,
      subscriptionId: subscription.id,
      amountCents: starter.priceCents,
      currency: "EUR",
      status: "PAID",
    },
  });

  console.log("Seed concluído:", { admin: admin.email, plans: [starter.name, scale.name, enterprise.name] });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
