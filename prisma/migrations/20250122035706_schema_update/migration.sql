-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://imagedelivery.net/zRDsOnXdrMQRT3BoRETbLA/a6bec09e-1607-4c2a-e2c1-2f7eec4d5300/public',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "createdAt", "email", "id", "password", "updatedAt", "username") SELECT coalesce("avatar", 'https://imagedelivery.net/zRDsOnXdrMQRT3BoRETbLA/a6bec09e-1607-4c2a-e2c1-2f7eec4d5300/public') AS "avatar", "createdAt", "email", "id", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
