/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Technologies` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User_models" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "title" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "born" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'INTERNSHIP',
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "skills" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Experience_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User_models" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Experience" ("company", "description", "id", "logo", "skills", "type") SELECT "company", "description", "id", "logo", "skills", "type" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE TABLE "new_Languages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lang" TEXT NOT NULL,
    "imaghes" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Languages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User_models" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Languages" ("id", "imaghes", "lang") SELECT "id", "imaghes", "lang" FROM "Languages";
DROP TABLE "Languages";
ALTER TABLE "new_Languages" RENAME TO "Languages";
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caption" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pinned" BOOLEAN NOT NULL,
    "tags" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User_models" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("caption", "createdAt", "id", "images", "pinned", "tags", "updatedAt") SELECT "caption", "createdAt", "id", "images", "pinned", "tags", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "liveLink" TEXT NOT NULL,
    "codelink" TEXT NOT NULL,
    "Images" TEXT NOT NULL,
    "Skills" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Projects_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User_models" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Projects" ("Images", "Skills", "codelink", "description", "id", "liveLink", "title") SELECT "Images", "Skills", "codelink", "description", "id", "liveLink", "title" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE TABLE "new_Technologies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "Images" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Technologies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User_models" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Technologies" ("Images", "id", "title") SELECT "Images", "id", "title" FROM "Technologies";
DROP TABLE "Technologies";
ALTER TABLE "new_Technologies" RENAME TO "Technologies";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
