import { MigrationInterface, QueryRunner } from 'typeorm';

export class update1681159706743 implements MigrationInterface {
  name = 'update1681159706743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "placeName" text, "city" text, "county" text, "state" text, "street" text, "street2" text, "zipCode" text, "latitude" numeric, "longitude" numeric, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fileId" text NOT NULL, "label" text NOT NULL, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."jurisdictions_languages_enum" AS ENUM('en', 'es', 'vi', 'zh', 'tl')`,
    );
    await queryRunner.query(
      `CREATE TABLE "jurisdictions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "notificationsSignUpURL" text, "languages" "public"."jurisdictions_languages_enum" array NOT NULL DEFAULT '{en}', "partnerTerms" text, "publicUrl" text NOT NULL DEFAULT '', "emailFromAddress" text, "rentalAssistanceDefault" text NOT NULL, "enablePartnerSettings" boolean NOT NULL DEFAULT false, "enableAccessibilityFeatures" boolean NOT NULL DEFAULT false, "enableUtilitiesIncluded" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_60b3294568b273d896687dea59f" UNIQUE ("name"), CONSTRAINT "PK_7cc0bed21c9e2b32866c1109ec5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "listing_features" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "elevator" boolean, "wheelchairRamp" boolean, "serviceAnimalsAllowed" boolean, "accessibleParking" boolean, "parkingOnSite" boolean, "inUnitWasherDryer" boolean, "laundryInBuilding" boolean, "barrierFreeEntrance" boolean, "rollInShower" boolean, "grabBars" boolean, "heatingInUnit" boolean, "acInUnit" boolean, "hearing" boolean, "visual" boolean, "mobility" boolean, CONSTRAINT "PK_88e4fe3e46d21d8b4fdadeb7599" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "listing_utilities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "water" boolean, "gas" boolean, "trash" boolean, "sewer" boolean, "electricity" boolean, "cable" boolean, "phone" boolean, "internet" boolean, CONSTRAINT "PK_8e88f883b389f7b31d331de764f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reserved_community_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, "jurisdictionId" uuid NOT NULL, CONSTRAINT "PK_af3937276e7bb53c30159d6ca0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ami_chart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "items" jsonb NOT NULL, "name" character varying NOT NULL, "jurisdictionId" uuid NOT NULL, CONSTRAINT "PK_e079bbfad233fdc79072acb33b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unit_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "numBedrooms" integer NOT NULL, CONSTRAINT "PK_105c42fcf447c1da21fd20bcb85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unit_rent_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_fb6b318fdee0a5b30521f63c516" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unit_accessibility_priority_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_2cf31d2ceea36e6a6b970608565" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unit_ami_chart_overrides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "items" jsonb NOT NULL, CONSTRAINT "PK_839676df1bd1ac12ff09b9d920d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amiPercentage" text, "annualIncomeMin" text, "monthlyIncomeMin" text, "floor" integer, "annualIncomeMax" text, "maxOccupancy" integer, "minOccupancy" integer, "monthlyRent" text, "numBathrooms" integer, "numBedrooms" integer, "number" text, "sqFeet" numeric(8,2), "monthlyRentAsPercentOfIncome" numeric(8,2), "bmrProgramChart" boolean, "amiChartId" uuid, "listingId" uuid, "unitTypeId" uuid, "unitRentTypeId" uuid, "priorityTypeId" uuid, "amiChartOverrideId" uuid, CONSTRAINT "REL_f55ea8f8c0836b0936c4f30f6f" UNIQUE ("amiChartOverrideId"), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "units_summary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "monthlyRentMin" integer, "monthlyRentMax" integer, "monthlyRentAsPercentOfIncome" numeric(8,2), "amiPercentage" integer, "minimumIncomeMin" text, "minimumIncomeMax" text, "maxOccupancy" integer, "minOccupancy" integer, "floorMin" integer, "floorMax" integer, "sqFeetMin" numeric(8,2), "sqFeetMax" numeric(8,2), "totalCount" integer, "totalAvailable" integer, "unitTypeId" uuid, "listingId" uuid, "priorityTypeId" uuid, CONSTRAINT "PK_8d8c4940fab2a9d1b2e7ddd9e49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "paper_applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "language" character varying NOT NULL, "fileId" uuid, "applicationMethodId" uuid, CONSTRAINT "PK_1bc5b0234d874ec03f500621d43" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."application_methods_type_enum" AS ENUM('Internal', 'FileDownload', 'ExternalLink', 'PaperPickup', 'POBox', 'LeasingAgent', 'Referral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "application_methods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."application_methods_type_enum" NOT NULL, "label" text, "externalReference" text, "acceptsPostmarkedApplications" boolean, "phoneNumber" text, "listingId" uuid, CONSTRAINT "PK_c58506819ffaba3863a4edc5e9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "additionalApplicationSubmissionNotes" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "digitalApplication" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "commonDigitalApplication" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "paperApplication" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "referralOpportunity" boolean`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "accessibility" text`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "amenities" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "buildingTotalUnits" integer`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "developer" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "householdSizeMax" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "householdSizeMin" integer`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "neighborhood" text`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "petPolicy" text`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "smokingPolicy" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "unitsAvailable" integer`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "unitAmenities" text`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "servicesOffered" text`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "yearBuilt" integer`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationDueDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationOpenDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "applicationFee" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationOrganization" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationPickUpAddressOfficeHours" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationDropOffAddressOfficeHours" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "buildingSelectionCriteria" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "costsNotIncluded" text`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "creditHistory" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "criminalBackground" text`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "depositMin" text`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "depositMax" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "depositHelperText" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "disableUnitsAccordion" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "leasingAgentEmail" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "leasingAgentName" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "leasingAgentOfficeHours" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "leasingAgentPhone" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "leasingAgentTitle" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "postmarkedApplicationsReceivedByDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "programRules" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "rentalAssistance" text`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "rentalHistory" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "requiredDocuments" text`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "specialNotes" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "waitlistCurrentSize" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "waitlistMaxSize" integer`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "whatToExpect" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "displayWaitlistSize" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "reservedCommunityDescription" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "reservedCommunityMinAge" integer`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "resultLink" text`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "isWaitlistOpen" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "waitlistOpenSpots" integer`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "customMapPin" boolean`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "publishedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "closedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "afsLastRunAt" TIMESTAMP WITH TIME ZONE DEFAULT '1970-01-01'`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "lastApplicationUpdateAt" TIMESTAMP WITH TIME ZONE DEFAULT '1970-01-01'`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "assets" jsonb NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."listing_applicationpickupaddresstype_enum" AS ENUM('leasingAgent')`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationPickUpAddressType" "public"."listing_applicationpickupaddresstype_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."listing_applicationdropoffaddresstype_enum" AS ENUM('leasingAgent')`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationDropOffAddressType" "public"."listing_applicationdropoffaddresstype_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."listing_applicationmailingaddresstype_enum" AS ENUM('leasingAgent')`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationMailingAddressType" "public"."listing_applicationmailingaddresstype_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."listing_reviewordertype_enum" AS ENUM('lottery', 'firstComeFirstServe', 'waitlist')`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "reviewOrderType" "public"."listing_reviewordertype_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."listing_status_enum" AS ENUM('active', 'pending', 'closed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "status" "public"."listing_status_enum" NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "buildingSelectionCriteriaFileId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "resultId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "buildingAddressId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationPickUpAddressId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationDropOffAddressId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "applicationMailingAddressId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "leasingAgentAddressId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "utilitiesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "UQ_74bd88151e20c187ca30d8b268a" UNIQUE ("utilitiesId")`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "featuresId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "UQ_f418645e741f5ef0747371815d9" UNIQUE ("featuresId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "reservedCommunityTypeId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "listing" ADD "jurisdictionId" uuid`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "name" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "reserved_community_types" ADD CONSTRAINT "FK_5be13b4adc1c5a1f9489d0fd4a9" FOREIGN KEY ("jurisdictionId") REFERENCES "jurisdictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ami_chart" ADD CONSTRAINT "FK_b8a41c7dc2999e112a4cc78c1c5" FOREIGN KEY ("jurisdictionId") REFERENCES "jurisdictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" ADD CONSTRAINT "FK_08d3fb9e9f12edf0716f7389e6b" FOREIGN KEY ("amiChartId") REFERENCES "ami_chart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" ADD CONSTRAINT "FK_67937fce5ec44a6213b65e70ad4" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" ADD CONSTRAINT "FK_fe0cd232c5b6624c3181f31bb11" FOREIGN KEY ("unitTypeId") REFERENCES "unit_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" ADD CONSTRAINT "FK_de94510355a61ecc4d18ae63ba1" FOREIGN KEY ("unitRentTypeId") REFERENCES "unit_rent_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" ADD CONSTRAINT "FK_08309a32e483162c40fd68c5964" FOREIGN KEY ("priorityTypeId") REFERENCES "unit_accessibility_priority_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" ADD CONSTRAINT "FK_f55ea8f8c0836b0936c4f30f6fc" FOREIGN KEY ("amiChartOverrideId") REFERENCES "unit_ami_chart_overrides"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units_summary" ADD CONSTRAINT "FK_90e5006d4b33714ac6b9be2b9b1" FOREIGN KEY ("unitTypeId") REFERENCES "unit_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units_summary" ADD CONSTRAINT "FK_2b53e191e2cfbdba48e5623e907" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "units_summary" ADD CONSTRAINT "FK_13220176bbd907be318103a68fd" FOREIGN KEY ("priorityTypeId") REFERENCES "unit_accessibility_priority_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_cb02f686107734d0a808e4fe929" FOREIGN KEY ("buildingSelectionCriteriaFileId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_159984c34c528e487f80808ec93" FOREIGN KEY ("resultId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_6fc1b8d8693b24264ad9d938ad1" FOREIGN KEY ("buildingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_bb82b66bb4e3c2cf10f58863ca9" FOREIGN KEY ("applicationPickUpAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_802418917a90c0349ea86e1ebd0" FOREIGN KEY ("applicationDropOffAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_79f1b0701cff87f59801c0ec605" FOREIGN KEY ("applicationMailingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_e03e295bada01235c36af433689" FOREIGN KEY ("leasingAgentAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_74bd88151e20c187ca30d8b268a" FOREIGN KEY ("utilitiesId") REFERENCES "listing_utilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_f418645e741f5ef0747371815d9" FOREIGN KEY ("featuresId") REFERENCES "listing_features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_4a28afee82ccfef5fe2930b61b2" FOREIGN KEY ("reservedCommunityTypeId") REFERENCES "reserved_community_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_05cb93d9df77a13c4b9b508af39" FOREIGN KEY ("jurisdictionId") REFERENCES "jurisdictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "paper_applications" ADD CONSTRAINT "FK_b1964b2d94bbe497c92f2ad4677" FOREIGN KEY ("fileId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "paper_applications" ADD CONSTRAINT "FK_216acc2a40690ddfbb8e1f76b96" FOREIGN KEY ("applicationMethodId") REFERENCES "application_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "application_methods" ADD CONSTRAINT "FK_0abcb167f766500e17ea573a6b8" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "application_methods" DROP CONSTRAINT "FK_0abcb167f766500e17ea573a6b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paper_applications" DROP CONSTRAINT "FK_216acc2a40690ddfbb8e1f76b96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paper_applications" DROP CONSTRAINT "FK_b1964b2d94bbe497c92f2ad4677"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_05cb93d9df77a13c4b9b508af39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_4a28afee82ccfef5fe2930b61b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_f418645e741f5ef0747371815d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_74bd88151e20c187ca30d8b268a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_e03e295bada01235c36af433689"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_79f1b0701cff87f59801c0ec605"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_802418917a90c0349ea86e1ebd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_bb82b66bb4e3c2cf10f58863ca9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_6fc1b8d8693b24264ad9d938ad1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_159984c34c528e487f80808ec93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_cb02f686107734d0a808e4fe929"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units_summary" DROP CONSTRAINT "FK_13220176bbd907be318103a68fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units_summary" DROP CONSTRAINT "FK_2b53e191e2cfbdba48e5623e907"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units_summary" DROP CONSTRAINT "FK_90e5006d4b33714ac6b9be2b9b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" DROP CONSTRAINT "FK_f55ea8f8c0836b0936c4f30f6fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" DROP CONSTRAINT "FK_08309a32e483162c40fd68c5964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" DROP CONSTRAINT "FK_de94510355a61ecc4d18ae63ba1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" DROP CONSTRAINT "FK_fe0cd232c5b6624c3181f31bb11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" DROP CONSTRAINT "FK_67937fce5ec44a6213b65e70ad4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "units" DROP CONSTRAINT "FK_08d3fb9e9f12edf0716f7389e6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ami_chart" DROP CONSTRAINT "FK_b8a41c7dc2999e112a4cc78c1c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserved_community_types" DROP CONSTRAINT "FK_5be13b4adc1c5a1f9489d0fd4a9"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "jurisdictionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "reservedCommunityTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "UQ_f418645e741f5ef0747371815d9"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "featuresId"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "UQ_74bd88151e20c187ca30d8b268a"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "utilitiesId"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "leasingAgentAddressId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationMailingAddressId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationDropOffAddressId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationPickUpAddressId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "buildingAddressId"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "resultId"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "buildingSelectionCriteriaFileId"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."listing_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "reviewOrderType"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."listing_reviewordertype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationMailingAddressType"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."listing_applicationmailingaddresstype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationDropOffAddressType"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."listing_applicationdropoffaddresstype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationPickUpAddressType"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."listing_applicationpickupaddresstype_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "assets"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "lastApplicationUpdateAt"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "afsLastRunAt"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "closedAt"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "publishedAt"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "customMapPin"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "waitlistOpenSpots"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "isWaitlistOpen"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "resultLink"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "reservedCommunityMinAge"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "reservedCommunityDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "displayWaitlistSize"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "whatToExpect"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "waitlistMaxSize"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "waitlistCurrentSize"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "specialNotes"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "requiredDocuments"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "rentalHistory"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "rentalAssistance"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "programRules"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "postmarkedApplicationsReceivedByDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "leasingAgentTitle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "leasingAgentPhone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "leasingAgentOfficeHours"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "leasingAgentName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "leasingAgentEmail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "disableUnitsAccordion"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "depositHelperText"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "depositMax"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "depositMin"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "criminalBackground"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "creditHistory"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "costsNotIncluded"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "buildingSelectionCriteria"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationDropOffAddressOfficeHours"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationPickUpAddressOfficeHours"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationOrganization"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationFee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationOpenDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "applicationDueDate"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "yearBuilt"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "servicesOffered"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "unitAmenities"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "unitsAvailable"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "smokingPolicy"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "petPolicy"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "neighborhood"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "householdSizeMin"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "householdSizeMax"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "developer"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "buildingTotalUnits"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "amenities"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "accessibility"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "referralOpportunity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "paperApplication"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "commonDigitalApplication"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "digitalApplication"`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "additionalApplicationSubmissionNotes"`,
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "createdAt"`);
    await queryRunner.query(`DROP TABLE "application_methods"`);
    await queryRunner.query(
      `DROP TYPE "public"."application_methods_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "paper_applications"`);
    await queryRunner.query(`DROP TABLE "units_summary"`);
    await queryRunner.query(`DROP TABLE "units"`);
    await queryRunner.query(`DROP TABLE "unit_ami_chart_overrides"`);
    await queryRunner.query(`DROP TABLE "unit_accessibility_priority_types"`);
    await queryRunner.query(`DROP TABLE "unit_rent_types"`);
    await queryRunner.query(`DROP TABLE "unit_types"`);
    await queryRunner.query(`DROP TABLE "ami_chart"`);
    await queryRunner.query(`DROP TABLE "reserved_community_types"`);
    await queryRunner.query(`DROP TABLE "listing_utilities"`);
    await queryRunner.query(`DROP TABLE "listing_features"`);
    await queryRunner.query(`DROP TABLE "jurisdictions"`);
    await queryRunner.query(
      `DROP TYPE "public"."jurisdictions_languages_enum"`,
    );
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
