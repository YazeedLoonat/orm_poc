/*
  Warnings:

  - You are about to drop the `Listing` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "application_methods_type_enum" AS ENUM ('Internal', 'FileDownload', 'ExternalLink', 'PaperPickup', 'POBox', 'LeasingAgent', 'Referral');

-- CreateEnum
CREATE TYPE "jurisdictions_languages_enum" AS ENUM ('en', 'es', 'vi', 'zh', 'tl');

-- CreateEnum
CREATE TYPE "listing_applicationdropoffaddresstype_enum" AS ENUM ('leasingAgent');

-- CreateEnum
CREATE TYPE "listing_applicationmailingaddresstype_enum" AS ENUM ('leasingAgent');

-- CreateEnum
CREATE TYPE "listing_applicationpickupaddresstype_enum" AS ENUM ('leasingAgent');

-- CreateEnum
CREATE TYPE "listing_reviewordertype_enum" AS ENUM ('lottery', 'firstComeFirstServe', 'waitlist');

-- CreateEnum
CREATE TYPE "listing_status_enum" AS ENUM ('active', 'pending', 'closed');

-- DropTable
DROP TABLE "Listing";

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "placeName" TEXT,
    "city" TEXT,
    "county" TEXT,
    "state" TEXT,
    "street" TEXT,
    "street2" TEXT,
    "zipCode" TEXT,
    "latitude" DECIMAL,
    "longitude" DECIMAL,

    CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ami_chart" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" JSONB NOT NULL,
    "name" VARCHAR NOT NULL,
    "jurisdictionId" UUID NOT NULL,

    CONSTRAINT "PK_e079bbfad233fdc79072acb33b5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_methods" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "application_methods_type_enum" NOT NULL,
    "label" TEXT,
    "externalReference" TEXT,
    "acceptsPostmarkedApplications" BOOLEAN,
    "phoneNumber" TEXT,
    "listingId" UUID,

    CONSTRAINT "PK_c58506819ffaba3863a4edc5e9e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileId" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jurisdictions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "notificationsSignUpURL" TEXT,
    "languages" "jurisdictions_languages_enum"[] DEFAULT ARRAY['en']::"jurisdictions_languages_enum"[],
    "partnerTerms" TEXT,
    "publicUrl" TEXT NOT NULL DEFAULT '',
    "emailFromAddress" TEXT,
    "rentalAssistanceDefault" TEXT NOT NULL,
    "enablePartnerSettings" BOOLEAN NOT NULL DEFAULT false,
    "enableAccessibilityFeatures" BOOLEAN NOT NULL DEFAULT false,
    "enableUtilitiesIncluded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_7cc0bed21c9e2b32866c1109ec5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "additionalApplicationSubmissionNotes" TEXT,
    "digitalApplication" BOOLEAN,
    "commonDigitalApplication" BOOLEAN,
    "paperApplication" BOOLEAN,
    "referralOpportunity" BOOLEAN,
    "accessibility" TEXT,
    "amenities" TEXT,
    "buildingTotalUnits" INTEGER,
    "developer" TEXT,
    "householdSizeMax" INTEGER,
    "householdSizeMin" INTEGER,
    "neighborhood" TEXT,
    "petPolicy" TEXT,
    "smokingPolicy" TEXT,
    "unitsAvailable" INTEGER,
    "unitAmenities" TEXT,
    "servicesOffered" TEXT,
    "yearBuilt" INTEGER,
    "applicationDueDate" TIMESTAMPTZ(6),
    "applicationOpenDate" TIMESTAMPTZ(6),
    "applicationFee" TEXT,
    "applicationOrganization" TEXT,
    "applicationPickUpAddressOfficeHours" TEXT,
    "applicationDropOffAddressOfficeHours" TEXT,
    "buildingSelectionCriteria" TEXT,
    "costsNotIncluded" TEXT,
    "creditHistory" TEXT,
    "criminalBackground" TEXT,
    "depositMin" TEXT,
    "depositMax" TEXT,
    "depositHelperText" TEXT,
    "disableUnitsAccordion" BOOLEAN,
    "leasingAgentEmail" TEXT,
    "leasingAgentName" TEXT,
    "leasingAgentOfficeHours" TEXT,
    "leasingAgentPhone" TEXT,
    "leasingAgentTitle" TEXT,
    "postmarkedApplicationsReceivedByDate" TIMESTAMPTZ(6),
    "programRules" TEXT,
    "rentalAssistance" TEXT,
    "rentalHistory" TEXT,
    "requiredDocuments" TEXT,
    "specialNotes" TEXT,
    "waitlistCurrentSize" INTEGER,
    "waitlistMaxSize" INTEGER,
    "whatToExpect" TEXT,
    "displayWaitlistSize" BOOLEAN NOT NULL,
    "reservedCommunityDescription" TEXT,
    "reservedCommunityMinAge" INTEGER,
    "resultLink" TEXT,
    "isWaitlistOpen" BOOLEAN,
    "waitlistOpenSpots" INTEGER,
    "customMapPin" BOOLEAN,
    "publishedAt" TIMESTAMPTZ(6),
    "closedAt" TIMESTAMPTZ(6),
    "afsLastRunAt" TIMESTAMPTZ(6) DEFAULT '1970-01-01 00:00:00-07'::timestamp with time zone,
    "lastApplicationUpdateAt" TIMESTAMPTZ(6) DEFAULT '1970-01-01 00:00:00-07'::timestamp with time zone,
    "assets" JSONB NOT NULL,
    "applicationPickUpAddressType" "listing_applicationpickupaddresstype_enum",
    "applicationDropOffAddressType" "listing_applicationdropoffaddresstype_enum",
    "applicationMailingAddressType" "listing_applicationmailingaddresstype_enum",
    "reviewOrderType" "listing_reviewordertype_enum",
    "status" "listing_status_enum" NOT NULL DEFAULT 'pending',
    "buildingSelectionCriteriaFileId" UUID,
    "resultId" UUID,
    "buildingAddressId" UUID,
    "applicationPickUpAddressId" UUID,
    "applicationDropOffAddressId" UUID,
    "applicationMailingAddressId" UUID,
    "leasingAgentAddressId" UUID,
    "utilitiesId" UUID,
    "featuresId" UUID,
    "reservedCommunityTypeId" UUID,
    "jurisdictionId" UUID,
    "name" TEXT NOT NULL,

    CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing_features" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "elevator" BOOLEAN,
    "wheelchairRamp" BOOLEAN,
    "serviceAnimalsAllowed" BOOLEAN,
    "accessibleParking" BOOLEAN,
    "parkingOnSite" BOOLEAN,
    "inUnitWasherDryer" BOOLEAN,
    "laundryInBuilding" BOOLEAN,
    "barrierFreeEntrance" BOOLEAN,
    "rollInShower" BOOLEAN,
    "grabBars" BOOLEAN,
    "heatingInUnit" BOOLEAN,
    "acInUnit" BOOLEAN,
    "hearing" BOOLEAN,
    "visual" BOOLEAN,
    "mobility" BOOLEAN,

    CONSTRAINT "PK_88e4fe3e46d21d8b4fdadeb7599" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing_utilities" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "water" BOOLEAN,
    "gas" BOOLEAN,
    "trash" BOOLEAN,
    "sewer" BOOLEAN,
    "electricity" BOOLEAN,
    "cable" BOOLEAN,
    "phone" BOOLEAN,
    "internet" BOOLEAN,

    CONSTRAINT "PK_8e88f883b389f7b31d331de764f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paper_applications" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" VARCHAR NOT NULL,
    "fileId" UUID,
    "applicationMethodId" UUID,

    CONSTRAINT "PK_1bc5b0234d874ec03f500621d43" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserved_community_types" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "jurisdictionId" UUID NOT NULL,

    CONSTRAINT "PK_af3937276e7bb53c30159d6ca0b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_accessibility_priority_types" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "PK_2cf31d2ceea36e6a6b970608565" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_ami_chart_overrides" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" JSONB NOT NULL,

    CONSTRAINT "PK_839676df1bd1ac12ff09b9d920d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_rent_types" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "PK_fb6b318fdee0a5b30521f63c516" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_types" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "numBedrooms" INTEGER NOT NULL,

    CONSTRAINT "PK_105c42fcf447c1da21fd20bcb85" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amiPercentage" TEXT,
    "annualIncomeMin" TEXT,
    "monthlyIncomeMin" TEXT,
    "floor" INTEGER,
    "annualIncomeMax" TEXT,
    "maxOccupancy" INTEGER,
    "minOccupancy" INTEGER,
    "monthlyRent" TEXT,
    "numBathrooms" INTEGER,
    "numBedrooms" INTEGER,
    "number" TEXT,
    "sqFeet" DECIMAL(8,2),
    "monthlyRentAsPercentOfIncome" DECIMAL(8,2),
    "bmrProgramChart" BOOLEAN,
    "amiChartId" UUID,
    "listingId" UUID,
    "unitTypeId" UUID,
    "unitRentTypeId" UUID,
    "priorityTypeId" UUID,
    "amiChartOverrideId" UUID,

    CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units_summary" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monthlyRentMin" INTEGER,
    "monthlyRentMax" INTEGER,
    "monthlyRentAsPercentOfIncome" DECIMAL(8,2),
    "amiPercentage" INTEGER,
    "minimumIncomeMin" TEXT,
    "minimumIncomeMax" TEXT,
    "maxOccupancy" INTEGER,
    "minOccupancy" INTEGER,
    "floorMin" INTEGER,
    "floorMax" INTEGER,
    "sqFeetMin" DECIMAL(8,2),
    "sqFeetMax" DECIMAL(8,2),
    "totalCount" INTEGER,
    "totalAvailable" INTEGER,
    "unitTypeId" UUID,
    "listingId" UUID,
    "priorityTypeId" UUID,

    CONSTRAINT "PK_8d8c4940fab2a9d1b2e7ddd9e49" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_60b3294568b273d896687dea59f" ON "jurisdictions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_74bd88151e20c187ca30d8b268a" ON "listing"("utilitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_f418645e741f5ef0747371815d9" ON "listing"("featuresId");

-- CreateIndex
CREATE UNIQUE INDEX "REL_f55ea8f8c0836b0936c4f30f6f" ON "units"("amiChartOverrideId");

-- AddForeignKey
ALTER TABLE "ami_chart" ADD CONSTRAINT "FK_b8a41c7dc2999e112a4cc78c1c5" FOREIGN KEY ("jurisdictionId") REFERENCES "jurisdictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_methods" ADD CONSTRAINT "FK_0abcb167f766500e17ea573a6b8" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_05cb93d9df77a13c4b9b508af39" FOREIGN KEY ("jurisdictionId") REFERENCES "jurisdictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_159984c34c528e487f80808ec93" FOREIGN KEY ("resultId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_4a28afee82ccfef5fe2930b61b2" FOREIGN KEY ("reservedCommunityTypeId") REFERENCES "reserved_community_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_6fc1b8d8693b24264ad9d938ad1" FOREIGN KEY ("buildingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_74bd88151e20c187ca30d8b268a" FOREIGN KEY ("utilitiesId") REFERENCES "listing_utilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_79f1b0701cff87f59801c0ec605" FOREIGN KEY ("applicationMailingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_802418917a90c0349ea86e1ebd0" FOREIGN KEY ("applicationDropOffAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_bb82b66bb4e3c2cf10f58863ca9" FOREIGN KEY ("applicationPickUpAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_cb02f686107734d0a808e4fe929" FOREIGN KEY ("buildingSelectionCriteriaFileId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_e03e295bada01235c36af433689" FOREIGN KEY ("leasingAgentAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "FK_f418645e741f5ef0747371815d9" FOREIGN KEY ("featuresId") REFERENCES "listing_features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paper_applications" ADD CONSTRAINT "FK_216acc2a40690ddfbb8e1f76b96" FOREIGN KEY ("applicationMethodId") REFERENCES "application_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paper_applications" ADD CONSTRAINT "FK_b1964b2d94bbe497c92f2ad4677" FOREIGN KEY ("fileId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_community_types" ADD CONSTRAINT "FK_5be13b4adc1c5a1f9489d0fd4a9" FOREIGN KEY ("jurisdictionId") REFERENCES "jurisdictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "FK_08309a32e483162c40fd68c5964" FOREIGN KEY ("priorityTypeId") REFERENCES "unit_accessibility_priority_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "FK_08d3fb9e9f12edf0716f7389e6b" FOREIGN KEY ("amiChartId") REFERENCES "ami_chart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "FK_67937fce5ec44a6213b65e70ad4" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "FK_de94510355a61ecc4d18ae63ba1" FOREIGN KEY ("unitRentTypeId") REFERENCES "unit_rent_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "FK_f55ea8f8c0836b0936c4f30f6fc" FOREIGN KEY ("amiChartOverrideId") REFERENCES "unit_ami_chart_overrides"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "FK_fe0cd232c5b6624c3181f31bb11" FOREIGN KEY ("unitTypeId") REFERENCES "unit_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units_summary" ADD CONSTRAINT "FK_13220176bbd907be318103a68fd" FOREIGN KEY ("priorityTypeId") REFERENCES "unit_accessibility_priority_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units_summary" ADD CONSTRAINT "FK_2b53e191e2cfbdba48e5623e907" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units_summary" ADD CONSTRAINT "FK_90e5006d4b33714ac6b9be2b9b1" FOREIGN KEY ("unitTypeId") REFERENCES "unit_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
