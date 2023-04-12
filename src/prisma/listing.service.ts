import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  listing,
  jurisdictions_languages_enum,
  listing_status_enum,
  listing_reviewordertype_enum,
  listing_applicationdropoffaddresstype_enum,
  listing_applicationmailingaddresstype_enum,
  listing_applicationpickupaddresstype_enum,
  application_methods_type_enum,
  address,
  Prisma,
  assets,
  listing_utilities,
  listing_features,
  jurisdictions,
  reserved_community_types,
  application_methods,
  paper_applications,
  units,
  ami_chart,
  unit_types,
  unit_rent_types,
  unit_accessibility_priority_types,
  unit_ami_chart_overrides,
  units_summary,
} from '@prisma/client';
import { ValidationReturnType } from '../typeorm/types/validation-return-type';

@Injectable()
export class PrismaListingService {
  constructor(private prisma: PrismaService) {}

  async getRecords(): Promise<listing[]> {
    return this.prisma.listing.findMany();
  }

  async seedData(): Promise<boolean> {
    const range = [];
    for (let i = 0; i < 100; i++) {
      range.push(i);
    }

    const juris = await this.prisma.jurisdictions.create({
      data: {
        name: 'Jurisdiction name',
        notificationsSignUpURL: 'Jurisdiction notificationsSignUpURL',
        languages: [
          jurisdictions_languages_enum.en,
          jurisdictions_languages_enum.es,
        ],
        partnerTerms: 'Jurisdiction partnerTerms',
        publicUrl: 'Jurisdiction publicUrl',
        emailFromAddress: 'Jurisdiction emailFromAddress',
        rentalAssistanceDefault: 'Jurisdiction rentalAssistanceDefault',
        enablePartnerSettings: true,
        enableAccessibilityFeatures: true,
        enableUtilitiesIncluded: true,
      },
    });

    const asset = await this.prisma.assets.create({
      data: {
        fileId: 'Asset fileId',
        label: 'Asset label',
      },
    });

    const address = await this.prisma.address.create({
      data: {
        placeName: 'Address placeName',
        city: 'Address city',
        county: 'Address county',
        state: 'Address state',
        street: 'Address street',
        street2: 'Address street2',
        zipCode: 'Address zipCode',
        latitude: 0,
        longitude: 0,
      },
    });

    const reservedCommunityType =
      await this.prisma.reserved_community_types.create({
        data: {
          name: 'ReservedCommunityType name',
          description: 'ReservedCommunityType description',
          jurisdictionId: juris.id,
        },
      });

    const amiChart = await this.prisma.ami_chart.create({
      data: {
        items: [
          {
            percentOfAmi: 0,
            householdSize: 0,
            income: 0,
          },
        ],
        name: 'amiChart name',
        jurisdictionId: juris.id,
      },
    });

    const unitRentType = await this.prisma.unit_rent_types.create({
      data: {
        name: 'unitRentType name',
      },
    });

    const unitType = await this.prisma.unit_types.create({
      data: {
        name: 'unitType name',
        numBedrooms: 2,
      },
    });

    const unitAccessibilityPriorityType =
      await this.prisma.unit_accessibility_priority_types.create({
        data: {
          name: 'unitAccessibilityPriorityType name',
        },
      });

    const createUnits = (i: number): unknown[] => {
      return range.map((j) => ({
        ami_chart: {
          connect: {
            id: amiChart.id,
          },
        },
        amiPercentage: `unit ${i} amiPercentage ${j}`,
        annualIncomeMin: `unit ${i} annualIncomeMin ${j}`,
        monthlyIncomeMin: `unit ${i} monthlyIncomeMin ${j}`,
        floor: i,
        annualIncomeMax: `unit ${i} annualIncomeMax ${j}`,
        maxOccupancy: i,
        minOccupancy: i,
        monthlyRent: `unit ${i} monthlyRent ${j}`,
        numBathrooms: i,
        numBedrooms: i,
        number: `unit ${i} number ${j}`,
        sqFeet: j,
        monthlyRentAsPercentOfIncome: j,
        bmrProgramChart: true,
        unit_types: {
          connect: {
            id: unitType.id,
          },
        },
        unit_rent_types: {
          connect: {
            id: unitRentType.id,
          },
        },
        unit_accessibility_priority_types: {
          connect: {
            id: unitAccessibilityPriorityType.id,
          },
        },
        unit_ami_chart_overrides: {
          create: {
            items: [
              {
                percentOfAmi: j,
                householdSize: j,
                income: j,
              },
            ],
          },
        },
      }));
    };

    const createUnitsSummary = (num: number) => {
      const toReturn = [];
      for (let i = 0; i < 100; i++) {
        toReturn.push({
          unit_types: {
            connect: {
              id: unitType.id,
            },
          },
          monthlyRentMin: i,
          monthlyRentMax: i,
          monthlyRentAsPercentOfIncome: `${i}`,
          amiPercentage: i,
          minimumIncomeMin: `unitsSummary ${num} minimumIncomeMin ${i}`,
          minimumIncomeMax: `unitsSummary ${num} minimumIncomeMax ${i}`,
          maxOccupancy: i,
          minOccupancy: i,
          floorMin: i,
          floorMax: i,
          sqFeetMin: `${i}`,
          sqFeetMax: `${i}`,
          unit_accessibility_priority_types: {
            connect: {
              id: unitAccessibilityPriorityType.id,
            },
          },
          totalCount: i,
          totalAvailable: i,
        });
      }
      return toReturn;
    };

    for (let i = 0; i < 1000; i++) {
      await this.prisma.listing.create({
        data: {
          additionalApplicationSubmissionNotes: `Listing additionalApplicationSubmissionNotes ${i}`,
          digitalApplication: true,
          commonDigitalApplication: true,
          paperApplication: true,
          referralOpportunity: true,
          accessibility: `Listing accessibility ${i}`,
          amenities: `Listing amenities ${i}`,
          buildingTotalUnits: i,
          developer: `Listing developer ${i}`,
          householdSizeMax: i,
          householdSizeMin: i,
          neighborhood: `Listing neighborhood ${i}`,
          petPolicy: `Listing petPolicy ${i}`,
          smokingPolicy: `Listing smokingPolicy ${i}`,
          unitsAvailable: i,
          unitAmenities: `Listing unitAmenities ${i}`,
          servicesOffered: `Listing servicesOffered ${i}`,
          yearBuilt: i,
          applicationDueDate: new Date(),
          applicationOpenDate: new Date(),
          applicationFee: `Listing applicationFee ${i}`,
          applicationOrganization: `Listing applicationOrganization ${i}`,
          applicationPickUpAddressOfficeHours: `Listing applicationPickUpAddressOfficeHours ${i}`,
          applicationDropOffAddressOfficeHours: `Listing applicationDropOffAddressOfficeHours ${i}`,
          buildingSelectionCriteria: `Listing buildingSelectionCriteria ${i}`,
          costsNotIncluded: `Listing costsNotIncluded ${i}`,
          creditHistory: `Listing creditHistory ${i}`,
          criminalBackground: `Listing criminalBackground ${i}`,
          depositMin: `Listing depositMin ${i}`,
          depositMax: `Listing depositMax ${i}`,
          depositHelperText: `Listing depositHelperText ${i}`,
          disableUnitsAccordion: true,
          leasingAgentEmail: `Listing leasingAgentEmail ${i}`,
          leasingAgentName: `Listing leasingAgentName ${i}`,
          leasingAgentOfficeHours: `Listing leasingAgentOfficeHours ${i}`,
          leasingAgentPhone: `Listing leasingAgentPhone ${i}`,
          leasingAgentTitle: `Listing leasingAgentTitle ${i}`,
          name: `Listing name ${i}`,
          postmarkedApplicationsReceivedByDate: new Date(),
          programRules: `Listing programRules ${i}`,
          rentalAssistance: `Listing rentalAssistance ${i}`,
          rentalHistory: `Listing rentalHistory ${i}`,
          requiredDocuments: `Listing requiredDocuments ${i}`,
          specialNotes: `Listing specialNotes ${i}`,
          waitlistCurrentSize: i,
          waitlistMaxSize: i,
          whatToExpect: `Listing whatToExpect ${i}`,
          displayWaitlistSize: true,
          reservedCommunityDescription: `Listing reservedCommunityDescription ${i}`,
          reservedCommunityMinAge: i,
          resultLink: `Listing resultLink ${i}`,
          isWaitlistOpen: true,
          waitlistOpenSpots: i,
          customMapPin: true,
          publishedAt: new Date(),
          closedAt: new Date(),
          afsLastRunAt: new Date(),
          lastApplicationUpdateAt: new Date(),

          // relationships
          applicationPickUpAddressType:
            listing_applicationpickupaddresstype_enum.leasingAgent,
          applicationDropOffAddressType:
            listing_applicationdropoffaddresstype_enum.leasingAgent,
          applicationMailingAddressType:
            listing_applicationmailingaddresstype_enum.leasingAgent,

          application_methods: {
            create: [
              {
                type: application_methods_type_enum.Internal,
                label: 'applicationMethods label',
                externalReference: 'applicationMethods ',
                acceptsPostmarkedApplications: true,
                phoneNumber: 'applicationMethods phoneNumber',
                paper_applications: {
                  create: [
                    {
                      language: jurisdictions_languages_enum.en,
                      assets: {
                        connect: {
                          id: asset.id,
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
          address_listing_buildingAddressIdToaddress: {
            connect: {
              id: address.id,
            },
          },
          address_listing_applicationPickUpAddressIdToaddress: {
            connect: {
              id: address.id,
            },
          },
          address_listing_applicationDropOffAddressIdToaddress: {
            connect: {
              id: address.id,
            },
          },
          address_listing_applicationMailingAddressIdToaddress: {
            connect: {
              id: address.id,
            },
          },
          address_listing_leasingAgentAddressIdToaddress: {
            connect: {
              id: address.id,
            },
          },
          assets_listing_buildingSelectionCriteriaFileIdToassets: {
            connect: {
              id: asset.id,
            },
          },
          assets_listing_resultIdToassets: {
            connect: {
              id: asset.id,
            },
          },
          assets: [{ id: asset.id }],
          listing_utilities: {
            create: {
              water: true,
              gas: true,
              trash: true,
              sewer: true,
              electricity: true,
              cable: true,
              phone: true,
              internet: true,
            },
          },
          listing_features: {
            create: {
              elevator: true,
              wheelchairRamp: true,
              serviceAnimalsAllowed: true,
              accessibleParking: true,
              parkingOnSite: true,
              inUnitWasherDryer: true,
              laundryInBuilding: true,
              barrierFreeEntrance: true,
              rollInShower: true,
              grabBars: true,
              heatingInUnit: true,
              acInUnit: true,
              hearing: true,
              visual: true,
              mobility: true,
            },
          },
          jurisdictions: {
            connect: {
              id: juris.id,
            },
          },
          status: listing_status_enum.active,
          reviewOrderType: listing_reviewordertype_enum.firstComeFirstServe,
          reserved_community_types: {
            connect: {
              id: reservedCommunityType.id,
            },
          },
          units: {
            create: createUnits(i),
          },
          units_summary: {
            create: createUnitsSummary(i),
          },
        },
      });
      console.info('created listing #', i);
    }

    return true;
  }

  async genericFindMany(skip, take) {
    return await this.prisma.listing.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        application_methods: {
          include: {
            paper_applications: {
              include: {
                assets: true,
              },
            },
          },
        },
        jurisdictions: true,
        assets_listing_resultIdToassets: true,
        reserved_community_types: {
          include: {
            jurisdictions: true,
          },
        },
        address_listing_buildingAddressIdToaddress: true,
        listing_utilities: true,
        address_listing_applicationMailingAddressIdToaddress: true,
        address_listing_applicationDropOffAddressIdToaddress: true,
        address_listing_applicationPickUpAddressIdToaddress: true,
        assets_listing_buildingSelectionCriteriaFileIdToassets: true,
        address_listing_leasingAgentAddressIdToaddress: true,
        listing_features: true,
        units: {
          include: {
            ami_chart: {
              include: {
                jurisdictions: true,
              },
            },
            unit_types: true,
            unit_rent_types: true,
            unit_accessibility_priority_types: true,
            unit_ami_chart_overrides: true,
          },
        },
        units_summary: {
          include: {
            unit_types: true,
            unit_accessibility_priority_types: true,
          },
        },
      },
    });
  }

  async validateByFind(
    skip: number,
    take: number,
  ): Promise<ValidationReturnType> {
    const startUsage = process.cpuUsage();
    const startMemory = process.memoryUsage();
    const startTime = new Date();
    const listings = await this.genericFindMany(skip, take);
    const endTime = new Date();
    const endUsage = process.cpuUsage();
    const endMemory = process.memoryUsage();
    const cpuUsagePercentChange = {
      user: (endUsage.user - startUsage.user) / startUsage.user,
      system: (endUsage.system - startUsage.system) / startUsage.system,
    };
    const memoryUsagePercentChange = {
      rss: (endMemory.rss - startMemory.rss) / startMemory.rss,
      heapTotal:
        (endMemory.heapTotal - startMemory.heapTotal) / startMemory.heapTotal,
      heapUsed:
        (endMemory.heapUsed - startMemory.heapUsed) / startMemory.heapUsed,
      external:
        (endMemory.external - startMemory.external) / startMemory.external,
      arrayBuffers:
        (endMemory.arrayBuffers - startMemory.arrayBuffers) /
        startMemory.arrayBuffers,
    };
    for (let i = 0; i < listings.length; i++) {
      const validationResults = this.validateListing(listings, i);
      if (validationResults !== 'all good') {
        return {
          message: `Listing ${i} Failed because of ${validationResults}`,
          runTimeForGatheringData: endTime.getTime() - startTime.getTime(),
          cpuUsagePercentChange,
          memoryUsagePercentChange,
        };
      }
    }
    return {
      message: 'all good',
      runTimeForGatheringData: endTime.getTime() - startTime.getTime(),
      cpuUsagePercentChange,
      memoryUsagePercentChange,
    };
  }

  // helper functions
  validateListing(
    listings: Prisma.PromiseReturnType<typeof this.genericFindMany>,
    num: number,
  ): string {
    const l = listings[num];
    if (
      l.additionalApplicationSubmissionNotes !==
      `Listing additionalApplicationSubmissionNotes ${num}`
    ) {
      return 'additionalApplicationSubmissionNotes';
    }
    if (l.digitalApplication !== true) {
      return 'digitalApplication';
    }
    if (l.commonDigitalApplication !== true) {
      return 'commonDigitalApplication';
    }
    if (l.paperApplication !== true) {
      return 'paperApplication';
    }
    if (l.referralOpportunity !== true) {
      return 'referralOpportunity';
    }
    if (l.accessibility !== `Listing accessibility ${num}`) {
      return 'accessibility';
    }
    if (l.amenities !== `Listing amenities ${num}`) {
      return 'amenities';
    }
    if (l.buildingTotalUnits !== num) {
      return 'buildingTotalUnits';
    }
    if (l.developer !== `Listing developer ${num}`) {
      return 'developer';
    }
    if (l.householdSizeMax !== num) {
      return 'householdSizeMax';
    }
    if (l.householdSizeMin !== num) {
      return 'householdSizeMin';
    }
    if (l.neighborhood !== `Listing neighborhood ${num}`) {
      return 'neighborhood';
    }
    if (l.petPolicy !== `Listing petPolicy ${num}`) {
      return 'petPolicy';
    }
    if (l.smokingPolicy !== `Listing smokingPolicy ${num}`) {
      return 'smokingPolicy';
    }
    if (l.unitsAvailable !== num) {
      return 'unitsAvailable';
    }
    if (l.unitAmenities !== `Listing unitAmenities ${num}`) {
      return 'unitAmenities';
    }
    if (l.servicesOffered !== `Listing servicesOffered ${num}`) {
      return 'servicesOffered';
    }
    if (l.yearBuilt !== num) {
      return 'yearBuilt';
    }
    if (!l.applicationDueDate) {
      return 'applicationDueDate';
    }
    if (!l.applicationOpenDate) {
      return 'applicationOpenDate';
    }
    if (l.applicationFee !== `Listing applicationFee ${num}`) {
      return 'applicationFee';
    }
    if (
      l.applicationOrganization !== `Listing applicationOrganization ${num}`
    ) {
      return 'applicationOrganization';
    }
    if (
      l.applicationPickUpAddressOfficeHours !==
      `Listing applicationPickUpAddressOfficeHours ${num}`
    ) {
      return 'applicationPickUpAddressOfficeHours';
    }
    if (
      l.applicationDropOffAddressOfficeHours !==
      `Listing applicationDropOffAddressOfficeHours ${num}`
    ) {
      return 'applicationDropOffAddressOfficeHours';
    }
    if (
      l.buildingSelectionCriteria !== `Listing buildingSelectionCriteria ${num}`
    ) {
      return 'buildingSelectionCriteria';
    }
    if (l.costsNotIncluded !== `Listing costsNotIncluded ${num}`) {
      return 'costsNotIncluded';
    }
    if (l.creditHistory !== `Listing creditHistory ${num}`) {
      return 'creditHistory';
    }
    if (l.criminalBackground !== `Listing criminalBackground ${num}`) {
      return 'criminalBackground';
    }
    if (l.depositMin !== `Listing depositMin ${num}`) {
      return 'depositMin';
    }
    if (l.depositMax !== `Listing depositMax ${num}`) {
      return 'depositMax';
    }
    if (l.depositHelperText !== `Listing depositHelperText ${num}`) {
      return 'depositHelperText';
    }
    if (l.disableUnitsAccordion !== true) {
      return 'disableUnitsAccordion';
    }
    if (l.leasingAgentEmail !== `Listing leasingAgentEmail ${num}`) {
      return 'leasingAgentEmail';
    }
    if (l.leasingAgentName !== `Listing leasingAgentName ${num}`) {
      return 'leasingAgentName';
    }
    if (
      l.leasingAgentOfficeHours !== `Listing leasingAgentOfficeHours ${num}`
    ) {
      return 'leasingAgentOfficeHours';
    }
    if (l.leasingAgentPhone !== `Listing leasingAgentPhone ${num}`) {
      return 'leasingAgentPhone';
    }
    if (l.leasingAgentTitle !== `Listing leasingAgentTitle ${num}`) {
      return 'leasingAgentTitle';
    }
    if (l.name !== `Listing name ${num}`) {
      return 'name';
    }
    if (!l.postmarkedApplicationsReceivedByDate) {
      return 'postmarkedApplicationsReceivedByDate';
    }
    if (l.programRules !== `Listing programRules ${num}`) {
      return 'programRules';
    }
    if (l.rentalAssistance !== `Listing rentalAssistance ${num}`) {
      return 'rentalAssistance';
    }
    if (l.rentalHistory !== `Listing rentalHistory ${num}`) {
      return 'rentalHistory';
    }
    if (l.requiredDocuments !== `Listing requiredDocuments ${num}`) {
      return 'requiredDocuments';
    }
    if (l.specialNotes !== `Listing specialNotes ${num}`) {
      return 'specialNotes';
    }
    if (l.waitlistCurrentSize !== num) {
      return 'waitlistCurrentSize';
    }
    if (l.waitlistMaxSize !== num) {
      return 'waitlistMaxSize';
    }
    if (l.whatToExpect !== `Listing whatToExpect ${num}`) {
      return 'whatToExpect';
    }
    if (l.displayWaitlistSize !== true) {
      return 'displayWaitlistSize';
    }
    if (
      l.reservedCommunityDescription !==
      `Listing reservedCommunityDescription ${num}`
    ) {
      return 'reservedCommunityDescription';
    }
    if (l.reservedCommunityMinAge !== num) {
      return 'reservedCommunityMinAge';
    }
    if (l.resultLink !== `Listing resultLink ${num}`) {
      return 'resultLink';
    }
    if (l.isWaitlistOpen !== true) {
      return 'isWaitlistOpen';
    }
    if (l.waitlistOpenSpots !== num) {
      return 'waitlistOpenSpots';
    }
    if (l.customMapPin !== true) {
      return 'customMapPin';
    }
    if (!l.publishedAt) {
      return 'publishedAt';
    }
    if (!l.closedAt) {
      return 'closedAt';
    }
    if (!l.afsLastRunAt) {
      return 'afsLastRunAt';
    }
    if (!l.lastApplicationUpdateAt) {
      return 'lastApplicationUpdateAt';
    }

    if (
      l.applicationPickUpAddressType !==
      listing_applicationpickupaddresstype_enum.leasingAgent
    ) {
      return 'applicationPickUpAddressType';
    }
    if (
      l.applicationDropOffAddressType !==
      listing_applicationdropoffaddresstype_enum.leasingAgent
    ) {
      return 'applicationDropOffAddressType';
    }
    if (
      l.applicationMailingAddressType !==
      listing_applicationmailingaddresstype_enum.leasingAgent
    ) {
      return 'applicationMailingAddressType';
    }
    if (!this.validateAddress(l.address_listing_buildingAddressIdToaddress)) {
      return 'buildingAddress';
    }
    if (
      !this.validateAddress(
        l.address_listing_applicationPickUpAddressIdToaddress,
      )
    ) {
      return 'applicationPickUpAddress';
    }
    if (
      !this.validateAddress(
        l.address_listing_applicationDropOffAddressIdToaddress,
      )
    ) {
      return 'applicationDropOffAddress';
    }
    if (
      !this.validateAddress(
        l.address_listing_applicationMailingAddressIdToaddress,
      )
    ) {
      return 'applicationMailingAddress';
    }
    if (
      !this.validateAddress(l.address_listing_leasingAgentAddressIdToaddress)
    ) {
      return 'leasingAgentAddress';
    }
    if (
      !this.validateAsset(
        l.assets_listing_buildingSelectionCriteriaFileIdToassets,
      )
    ) {
      return 'buildingSelectionCriteriaFile';
    }
    if (!this.validateAsset(l.assets_listing_resultIdToassets)) {
      return 'result';
    }
    if (!this.validateUtilities(l.listing_utilities)) {
      return 'utilities';
    }
    if (!this.validateFeatures(l.listing_features)) {
      return 'features';
    }
    if (l.status !== listing_status_enum.active) {
      return 'status';
    }
    if (
      l.reviewOrderType !== listing_reviewordertype_enum.firstComeFirstServe
    ) {
      return 'reviewOrderType';
    }
    if (!this.validateJurisdiction(l.jurisdictions)) {
      return 'jurisdiction';
    }
    if (!this.validateReservedCommunityType(l.reserved_community_types)) {
      return 'reservedCommunityType';
    }
    if (
      !l.application_methods.every((a) => this.validateApplicationMethods(a))
    ) {
      return 'applicationMethods';
    }
    if (!this.validateUnits(l.units, num)) {
      return 'units';
    }
    if (!this.validateUnitsSummary(l.units_summary, num)) {
      return 'validateUnitsSummary';
    }
    return 'all good';
  }

  validateAddress(a: address): boolean {
    if (a.placeName !== 'Address placeName') {
      return false;
    }
    if (a.city !== 'Address city') {
      return false;
    }
    if (a.county !== 'Address county') {
      return false;
    }
    if (a.state !== 'Address state') {
      return false;
    }
    if (a.street !== 'Address street') {
      return false;
    }
    if (a.street2 !== 'Address street2') {
      return false;
    }
    if (a.zipCode !== 'Address zipCode') {
      return false;
    }
    return true;
  }

  validateAsset(a: assets): boolean {
    if (a.fileId !== 'Asset fileId') {
      return false;
    }
    if (a.label !== 'Asset label') {
      return false;
    }
    return true;
  }

  validateUtilities(a: listing_utilities): boolean {
    if (a.water !== true) {
      return false;
    }
    if (a.gas !== true) {
      return false;
    }
    if (a.trash !== true) {
      return false;
    }
    if (a.sewer !== true) {
      return false;
    }
    if (a.electricity !== true) {
      return false;
    }
    if (a.cable !== true) {
      return false;
    }
    if (a.phone !== true) {
      return false;
    }
    if (a.internet !== true) {
      return false;
    }
    return true;
  }

  validateFeatures(a: listing_features): boolean {
    if (a.elevator !== true) {
      return false;
    }
    if (a.wheelchairRamp !== true) {
      return false;
    }
    if (a.serviceAnimalsAllowed !== true) {
      return false;
    }
    if (a.accessibleParking !== true) {
      return false;
    }
    if (a.parkingOnSite !== true) {
      return false;
    }
    if (a.inUnitWasherDryer !== true) {
      return false;
    }
    if (a.laundryInBuilding !== true) {
      return false;
    }
    if (a.barrierFreeEntrance !== true) {
      return false;
    }
    if (a.rollInShower !== true) {
      return false;
    }
    if (a.grabBars !== true) {
      return false;
    }
    if (a.heatingInUnit !== true) {
      return false;
    }
    if (a.acInUnit !== true) {
      return false;
    }
    if (a.hearing !== true) {
      return false;
    }
    if (a.visual !== true) {
      return false;
    }
    if (a.mobility !== true) {
      return false;
    }
    return true;
  }

  validateJurisdiction(a: jurisdictions): boolean {
    if (a.name !== 'Jurisdiction name') {
      return false;
    }
    if (a.notificationsSignUpURL !== 'Jurisdiction notificationsSignUpURL') {
      return false;
    }
    if (
      a.languages[0] !== jurisdictions_languages_enum.en ||
      a.languages[1] !== jurisdictions_languages_enum.es
    ) {
      return false;
    }
    if (a.partnerTerms !== 'Jurisdiction partnerTerms') {
      return false;
    }
    if (a.publicUrl !== 'Jurisdiction publicUrl') {
      return false;
    }
    if (a.emailFromAddress !== 'Jurisdiction emailFromAddress') {
      return false;
    }
    if (a.rentalAssistanceDefault !== 'Jurisdiction rentalAssistanceDefault') {
      return false;
    }
    if (a.enablePartnerSettings !== true) {
      return false;
    }
    if (a.enableAccessibilityFeatures !== true) {
      return false;
    }
    if (a.enableUtilitiesIncluded !== true) {
      return false;
    }
    return true;
  }

  validateReservedCommunityType(
    a: reserved_community_types & {
      jurisdictions: jurisdictions;
    },
  ): boolean {
    if (a.name !== 'ReservedCommunityType name') {
      return false;
    }
    if (a.description !== 'ReservedCommunityType description') {
      return false;
    }
    if (!this.validateJurisdiction(a.jurisdictions)) {
      return false;
    }
    return true;
  }

  validateApplicationMethods(
    a: application_methods & {
      paper_applications: (paper_applications & {
        assets: assets;
      })[];
    },
  ): boolean {
    if (a.type !== application_methods_type_enum.Internal) {
      return false;
    }
    if (a.label !== 'applicationMethods label') {
      return false;
    }
    if (a.externalReference !== 'applicationMethods ') {
      return false;
    }
    if (a.acceptsPostmarkedApplications !== true) {
      return false;
    }
    if (a.phoneNumber !== 'applicationMethods phoneNumber') {
      return false;
    }
    if (
      !a.paper_applications.every((app) => this.validatePaperApplications(app))
    ) {
      return false;
    }
    return true;
  }

  validatePaperApplications(
    a: paper_applications & {
      assets: assets;
    },
  ): boolean {
    if (a.language !== jurisdictions_languages_enum.en) {
      return false;
    }
    if (!this.validateAsset(a.assets)) {
      return false;
    }
    return true;
  }

  validateUnits(
    units: (units & {
      ami_chart: ami_chart & {
        jurisdictions: jurisdictions;
      };
      unit_accessibility_priority_types: unit_accessibility_priority_types;
      unit_rent_types: unit_rent_types;
      unit_ami_chart_overrides: unit_ami_chart_overrides;
      unit_types: unit_types;
    })[],
    num: number,
  ): boolean {
    if (units.length !== 100) {
      return false;
    }

    for (let i = 0; i < 100; i++) {
      const unit = units.find(
        (u) => u.amiPercentage === `unit ${num} amiPercentage ${i}`,
      );
      if (!unit) {
        return false;
      }
      if (unit.annualIncomeMin !== `unit ${num} annualIncomeMin ${i}`) {
        return false;
      }
      if (unit.monthlyIncomeMin !== `unit ${num} monthlyIncomeMin ${i}`) {
        return false;
      }
      if (unit.floor !== num) {
        return false;
      }
      if (unit.annualIncomeMax !== `unit ${num} annualIncomeMax ${i}`) {
        return false;
      }
      if (unit.maxOccupancy !== num) {
        return false;
      }
      if (unit.minOccupancy !== num) {
        return false;
      }
      if (unit.monthlyRent !== `unit ${num} monthlyRent ${i}`) {
        return false;
      }
      if (unit.numBathrooms !== num) {
        return false;
      }
      if (unit.numBedrooms !== num) {
        return false;
      }
      if (unit.number !== `unit ${num} number ${i}`) {
        return false;
      }
      if (unit.bmrProgramChart !== true) {
        return false;
      }
      if (!this.validateAmiChart(unit.ami_chart)) {
        return false;
      }
      if (!this.validateUnitType(unit.unit_types)) {
        return false;
      }
      if (!this.validateUnitRentType(unit.unit_rent_types)) {
        return false;
      }
      if (!this.validatePriorityType(unit.unit_accessibility_priority_types)) {
        return false;
      }
    }
    return true;
  }

  validateAmiChart(a: ami_chart & { jurisdictions: jurisdictions }): boolean {
    if (a.name !== 'amiChart name') {
      return false;
    }
    if (!this.validateJurisdiction(a.jurisdictions)) {
      return false;
    }
    return true;
  }

  validateUnitType(a: unit_types): boolean {
    if (a.name !== 'unitType name') {
      return false;
    }
    if (a.numBedrooms !== 2) {
      return false;
    }

    return true;
  }

  validateUnitRentType(a: unit_rent_types): boolean {
    if (a.name !== 'unitRentType name') {
      return false;
    }

    return true;
  }

  validatePriorityType(a: unit_accessibility_priority_types): boolean {
    if (a.name !== 'unitAccessibilityPriorityType name') {
      return false;
    }

    return true;
  }

  validateUnitsSummary(
    summaries: (units_summary & {
      unit_types: unit_types;
      unit_accessibility_priority_types: unit_accessibility_priority_types;
    })[],
    num: number,
  ): boolean {
    if (summaries.length !== 100) {
      return false;
    }
    for (let i = 0; i < 100; i++) {
      const s = summaries.find(
        (s) =>
          s.minimumIncomeMin === `unitsSummary ${num} minimumIncomeMin ${i}`,
      );
      if (!s) {
        return false;
      }
      if (s.monthlyRentMin !== i) {
        return false;
      }
      if (s.monthlyRentMax !== i) {
        return false;
      }
      if (s.amiPercentage !== i) {
        return false;
      }
      if (s.minimumIncomeMax !== `unitsSummary ${num} minimumIncomeMax ${i}`) {
        return false;
      }
      if (s.maxOccupancy !== i) {
        return false;
      }
      if (s.minOccupancy !== i) {
        return false;
      }
      if (s.floorMin !== i) {
        return false;
      }
      if (s.floorMax !== i) {
        return false;
      }
      if (s.totalCount !== i) {
        return false;
      }
      if (s.totalAvailable !== i) {
        return false;
      }
      if (!this.validateUnitType(s.unit_types)) {
        return false;
      }
      if (!this.validatePriorityType(s.unit_accessibility_priority_types)) {
        return false;
      }
    }
    return true;
  }
}
