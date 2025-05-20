-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_declarations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organisme" TEXT NOT NULL,
    "typeOrganisme" TEXT NOT NULL,
    "siret" TEXT,
    "url" TEXT NOT NULL,
    "intituleSite" TEXT,
    "niveauConformite" TEXT NOT NULL,
    "dateAudit" TEXT,
    "resultatAudit" TEXT,
    "derogationCharge" BOOLEAN DEFAULT false,
    "derogationExempt" BOOLEAN DEFAULT false,
    "detailDerogation" TEXT,
    "mesuresCorrectivesPrevues" TEXT,
    "datePrevueMiseEnConformite" TEXT,
    "budgetAlloue" TEXT,
    "etudeAccessibiliteRealisee" BOOLEAN DEFAULT false,
    "ressourcesHumainesDediees" BOOLEAN DEFAULT false,
    "prestatairesSpecialises" BOOLEAN DEFAULT false,
    "contactName" TEXT,
    "contactFonction" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "adresseSiege" TEXT,
    "contactFormulaire" BOOLEAN DEFAULT false,
    "contactEmailDedie" BOOLEAN DEFAULT false,
    "contactTelephone" BOOLEAN DEFAULT false,
    "contactCourrier" BOOLEAN DEFAULT false,
    "certificationInfos" BOOLEAN DEFAULT false,
    "dateCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" DATETIME NOT NULL,
    "htmlContent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft'
);
INSERT INTO "new_declarations" ("dateAudit", "dateCreation", "dateModification", "htmlContent", "id", "intituleSite", "niveauConformite", "organisme", "status", "typeOrganisme", "url") SELECT "dateAudit", "dateCreation", "dateModification", "htmlContent", "id", "intituleSite", "niveauConformite", "organisme", "status", "typeOrganisme", "url" FROM "declarations";
DROP TABLE "declarations";
ALTER TABLE "new_declarations" RENAME TO "declarations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
