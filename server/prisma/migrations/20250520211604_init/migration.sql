-- CreateTable
CREATE TABLE "declarations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organisme" TEXT NOT NULL,
    "typeOrganisme" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "intituleSite" TEXT,
    "niveauConformite" TEXT NOT NULL,
    "dateAudit" DATETIME,
    "dateCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" DATETIME NOT NULL,
    "htmlContent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active'
);
