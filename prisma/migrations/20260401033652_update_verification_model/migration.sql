-- AlterTable
ALTER TABLE "Verification" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Verification_identifier_idx" ON "Verification"("identifier");
