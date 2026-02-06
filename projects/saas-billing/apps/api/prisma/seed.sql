INSERT INTO "User" (id, email, name, "passwordHash", role, "createdAt", "updatedAt")
VALUES ('8fe7a01f-5693-4317-adc3-87e5c8e8d110','admin@saas.local','Admin SaaS','.gAUlFTlI.AVJw08yGoiudJ/hqDYM46AUpczNTtqm','ADMIN', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO "Plan" (id, name, description, "priceCents", interval, active, "createdAt", "updatedAt")
VALUES
  ('starter-plan','Starter','Ideal para equipas pequenas',2900,'MONTHLY',true, NOW(), NOW()),
  ('scale-plan','Scale','Para crescimento com automações',9900,'MONTHLY',true, NOW(), NOW()),
  ('enterprise-plan','Enterprise','Contas enterprise com SLA dedicado',24900,'MONTHLY',true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "Subscription" (id, "userId", "planId", status, "createdAt", "updatedAt")
VALUES (
  '4f2f956d-824f-4c26-9c7f-e9e9b07dad0e',
  (SELECT id FROM "User" WHERE email='admin@saas.local'),
  'starter-plan',
  'ACTIVE',
  NOW(), NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO "Invoice" (id, "userId", "subscriptionId", "amountCents", currency, status, "issuedAt")
VALUES (
  '114bc04e-12a7-4e24-aa2b-0a541beb24b4',
  (SELECT id FROM "User" WHERE email='admin@saas.local'),
  '4f2f956d-824f-4c26-9c7f-e9e9b07dad0e',
  2900,
  'EUR',
  'PAID',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
