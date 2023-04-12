import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Listing } from '../entities/listing.entity';
import { ListingService } from './listing.service';
import { ListingStatus } from '../types/listing-status-enum';
import { Jurisdiction } from '../entities/jurisdiction.entity';
import { Language } from '../types/language-enum';
import { ListingApplicationAddressType } from '../types/listing-application-address-type';
import { Asset } from '../entities/asset.entity';
import { ApplicationMethodType } from '../types/application-method-type-enum';
import { Address } from '../entities/address.entity';
import { ListingReviewOrder } from '../types/listing-review-order-enum';
import { ReservedCommunityType } from '../entities/reserved-community-type.entity';
import { AmiChart } from '../entities/ami-chart.entity';
import { UnitRentType } from '../entities/unit-rent-type.entity';
import { UnitType } from '../entities/unit-type.entity';
import { ListingUtilities } from '../entities/listing-utilities.entity';
import { ListingFeatures } from '../entities/listing-features.entity';
import { ApplicationMethod } from '../entities/application-method.entity';
import { PaperApplication } from '../entities/paper-application.entity';
import Unit from '../entities/unit.entity';
import { AmiChartItem } from '../entities/ami-chart-item.entity';
import { UnitAccessibilityPriorityType } from '../entities/unit-accessibility-priority-type.entity';
import { UnitsSummary } from '../entities/units-summary.entity';
import { ValidationReturnType } from '../types/validation-return-type';

@Injectable()
export class TypeormService {
  constructor(
    @Inject('LISTING_REPOSITORY')
    private listingRepository: Repository<Listing>,
    @Inject('JURISDICTION_REPOSITORY')
    private jurisdictionRepository: Repository<Jurisdiction>,
    @Inject('ASSET_REPOSITORY')
    private asssetRepository: Repository<Asset>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    @Inject('RESERVEDCOMMUNITYTYPE_REPOSITORY')
    private reservedCommunityTypeRepository: Repository<ReservedCommunityType>,
    @Inject('AMICHART_REPOSITORY')
    private amiChartRepository: Repository<AmiChart>,
    @Inject('UNITRENTTYPE_REPOSITORY')
    private unitRentTypeRepository: Repository<UnitRentType>,
    @Inject('UNITTYPE_REPOSITORY')
    private unitTypeRepository: Repository<UnitType>,
    @Inject('UNITACCESSIBILITYPRIORITYTYPE_REPOSITORY')
    private unitAccessibilityPriorityTypeRepository: Repository<UnitType>,
    private listingService: ListingService,
  ) {}
  async getByFind(): Promise<Listing[]> {
    return await this.listingService.findAll();
  }
  async validateByFind(
    skip: number,
    take: number,
  ): Promise<ValidationReturnType> {
    const startUsage = process.cpuUsage();
    const startMemory = process.memoryUsage();
    const startTime = new Date();
    const listings = await this.listingRepository.find({
      skip,
      take,
      order: {
        createdAt: 'ASC',
        units: {
          createdAt: 'ASC',
        },
        unitsSummary: {
          createdAt: 'ASC',
        },
      },
    });
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
      const validationResults = this.validateListing(listings[i], i);
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
  async getByQuerybuilder(): Promise<Listing[]> {
    const ids = await this.listingRepository
      .createQueryBuilder('listings')
      .select(['listings.id'])
      .orderBy('listings.createdAt', 'ASC')
      .getMany();

    const listings = await this.listingRepository
      .createQueryBuilder('listings')
      .select()
      .leftJoinAndSelect('listings.applicationMethods', 'applicationMethods')
      .leftJoinAndSelect(
        'applicationMethods.paperApplications',
        'paperApplications',
      )
      .leftJoinAndSelect('paperApplications.file', 'paperApplicationsFile')
      .leftJoinAndSelect(
        'listings.buildingSelectionCriteriaFile',
        'listings.buildingSelectionCriteriaFile',
      )
      .leftJoinAndSelect('listings.result', 'result')
      .leftJoinAndSelect('listings.buildingAddress', 'buildingAddress')
      .leftJoinAndSelect(
        'listings.applicationPickUpAddress',
        'applicationPickUpAddress',
      )
      .leftJoinAndSelect(
        'listings.applicationDropOffAddress',
        'listings.applicationDropOffAddress',
      )
      .leftJoinAndSelect(
        'listings.applicationMailingAddress',
        'listings.applicationMailingAddress',
      )
      .leftJoinAndSelect('listings.leasingAgentAddress', 'leasingAgentAddress')
      .leftJoinAndSelect('listings.utilities', 'utilities')
      .leftJoinAndSelect('listings.features', 'features')
      .leftJoinAndSelect(
        'listings.reservedCommunityType',
        'reservedCommunityType',
      )
      .leftJoinAndSelect('listings.jurisdiction', 'jurisdiction')
      .leftJoinAndSelect(
        'reservedCommunityType.jurisdiction',
        'resJurisdiction',
      )
      .where('listings.id IN (:...ids)', {
        ids: ids.map((listing) => listing.id),
      })
      .orderBy('listings.createdAt', 'ASC')
      .getMany();

    const units = await this.listingRepository
      .createQueryBuilder('listings')
      .select('listings.id')
      .leftJoinAndSelect('listings.units', 'units')
      .leftJoinAndSelect('units.amiChart', 'amiChart')
      .leftJoinAndSelect('amiChart.jurisdiction', 'amiChartJuris')
      .leftJoinAndSelect('units.unitType', 'unitType')
      .leftJoinAndSelect('units.unitRentType', 'unitRentType')
      .leftJoinAndSelect('units.priorityType', 'priorityType')
      .leftJoinAndSelect('units.amiChartOverride', 'amiChartOverride')
      .where('listings.id IN (:...ids)', {
        ids: ids.map((listing) => listing.id),
      })
      .orderBy('listings.createdAt', 'ASC')
      .addOrderBy('units.amiPercentage', 'ASC')
      .getMany();

    const unitsSummaries = await this.listingRepository
      .createQueryBuilder('listings')
      .select('listings.id')
      .leftJoinAndSelect('listings.unitsSummary', 'unitsSummary')
      .leftJoinAndSelect('unitsSummary.unitType', 'unitType')
      .leftJoinAndSelect('unitsSummary.priorityType', 'priorityType')
      .where('listings.id IN (:...ids)', {
        ids: ids.map((listing) => listing.id),
      })
      .orderBy('listings.id', 'ASC')
      .addOrderBy('unitsSummary.createdAt', 'ASC')
      .getMany();

    listings.forEach((listing) => {
      const unitSet = units.find((u) => u.id === listing.id);
      listing.units = unitSet.units;

      const unitSumnamrySet = unitsSummaries.find((u) => u.id === listing.id);
      listing.unitsSummary = unitSumnamrySet.unitsSummary;
    });

    return listings;
  }
  async validateByQuerybuilder(
    skip: number,
    take: number,
  ): Promise<ValidationReturnType> {
    const startUsage = process.cpuUsage();
    const startMemory = process.memoryUsage();
    const startTime = new Date();

    const ids = await this.listingRepository
      .createQueryBuilder('listings')
      .select(['listings.id'])
      .orderBy('listings.createdAt', 'ASC')
      .skip(skip)
      .take(take)
      .getMany();

    const listings = await this.listingRepository
      .createQueryBuilder('listings')
      .select()
      .leftJoinAndSelect('listings.applicationMethods', 'applicationMethods')
      .leftJoinAndSelect(
        'applicationMethods.paperApplications',
        'paperApplications',
      )
      .leftJoinAndSelect('paperApplications.file', 'paperApplicationsFile')
      .leftJoinAndSelect(
        'listings.buildingSelectionCriteriaFile',
        'listings.buildingSelectionCriteriaFile',
      )
      .leftJoinAndSelect('listings.result', 'result')
      .leftJoinAndSelect('listings.buildingAddress', 'buildingAddress')
      .leftJoinAndSelect(
        'listings.applicationPickUpAddress',
        'applicationPickUpAddress',
      )
      .leftJoinAndSelect(
        'listings.applicationDropOffAddress',
        'listings.applicationDropOffAddress',
      )
      .leftJoinAndSelect(
        'listings.applicationMailingAddress',
        'listings.applicationMailingAddress',
      )
      .leftJoinAndSelect('listings.leasingAgentAddress', 'leasingAgentAddress')
      .leftJoinAndSelect('listings.utilities', 'utilities')
      .leftJoinAndSelect('listings.features', 'features')
      .leftJoinAndSelect(
        'listings.reservedCommunityType',
        'reservedCommunityType',
      )
      .leftJoinAndSelect('listings.jurisdiction', 'jurisdiction')
      .leftJoinAndSelect(
        'reservedCommunityType.jurisdiction',
        'resJurisdiction',
      )
      .where('listings.id IN (:...ids)', {
        ids: ids.map((listing) => listing.id),
      })
      .orderBy('listings.createdAt', 'ASC')
      .getMany();

    const units = await this.listingRepository
      .createQueryBuilder('listings')
      .select('listings.id')
      .leftJoinAndSelect('listings.units', 'units')
      .leftJoinAndSelect('units.amiChart', 'amiChart')
      .leftJoinAndSelect('amiChart.jurisdiction', 'amiChartJuris')
      .leftJoinAndSelect('units.unitType', 'unitType')
      .leftJoinAndSelect('units.unitRentType', 'unitRentType')
      .leftJoinAndSelect('units.priorityType', 'priorityType')
      .leftJoinAndSelect('units.amiChartOverride', 'amiChartOverride')
      .where('listings.id IN (:...ids)', {
        ids: ids.map((listing) => listing.id),
      })
      .orderBy('listings.createdAt', 'ASC')
      .addOrderBy('units.amiPercentage', 'ASC')
      .getMany();

    const unitsSummaries = await this.listingRepository
      .createQueryBuilder('listings')
      .select('listings.id')
      .leftJoinAndSelect('listings.unitsSummary', 'unitsSummary')
      .leftJoinAndSelect('unitsSummary.unitType', 'unitType')
      .leftJoinAndSelect('unitsSummary.priorityType', 'priorityType')
      .where('listings.id IN (:...ids)', {
        ids: ids.map((listing) => listing.id),
      })
      .orderBy('listings.id', 'ASC')
      .addOrderBy('unitsSummary.createdAt', 'ASC')
      .getMany();

    listings.forEach((listing) => {
      const unitSet = units.find((u) => u.id === listing.id);
      listing.units = unitSet.units;

      const unitSumnamrySet = unitsSummaries.find((u) => u.id === listing.id);
      listing.unitsSummary = unitSumnamrySet.unitsSummary;
    });

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
      const validationResults = this.validateListing(listings[i], i);
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
  async seedData(): Promise<void> {
    const juris = await this.jurisdictionRepository.save({
      name: 'Jurisdiction name',
      notificationsSignUpURL: 'Jurisdiction notificationsSignUpURL',
      languages: [Language.en, Language.es],
      partnerTerms: 'Jurisdiction partnerTerms',
      publicUrl: 'Jurisdiction publicUrl',
      emailFromAddress: 'Jurisdiction emailFromAddress',
      rentalAssistanceDefault: 'Jurisdiction rentalAssistanceDefault',
      enablePartnerSettings: true,
      enableAccessibilityFeatures: true,
      enableUtilitiesIncluded: true,
    });

    const asset = await this.asssetRepository.save({
      fileId: 'Asset fileId',
      label: 'Asset label',
    });

    const address = await this.addressRepository.save({
      placeName: 'Address placeName',
      city: 'Address city',
      county: 'Address county',
      state: 'Address state',
      street: 'Address street',
      street2: 'Address street2',
      zipCode: 'Address zipCode',
      latitude: 0,
      longitude: 0,
    });

    const reservedCommunityType =
      await this.reservedCommunityTypeRepository.save({
        name: 'ReservedCommunityType name',
        description: 'ReservedCommunityType description',
        jurisdiction: { id: juris.id },
      });

    const amiChart = await this.amiChartRepository.save({
      items: [
        {
          percentOfAmi: 0,
          householdSize: 0,
          income: 0,
        },
      ],
      name: 'amiChart name',
      jurisdiction: { id: juris.id },
    });

    const unitRentType = await this.unitRentTypeRepository.save({
      name: 'unitRentType name',
    });

    const unitType = await this.unitTypeRepository.save({
      name: 'unitType name',
      numBedrooms: 2,
    });

    const unitAccessibilityPriorityType =
      await this.unitAccessibilityPriorityTypeRepository.save({
        name: 'unitAccessibilityPriorityType name',
      });

    const createUnits = (num: number) => {
      const toReturn = [];
      for (let i = 0; i < 100; i++) {
        toReturn.push({
          amiChart: { id: amiChart.id },
          amiPercentage: `unit ${num} amiPercentage ${i}`,
          annualIncomeMin: `unit ${num} annualIncomeMin ${i}`,
          monthlyIncomeMin: `unit ${num} monthlyIncomeMin ${i}`,
          floor: num,
          annualIncomeMax: `unit ${num} annualIncomeMax ${i}`,
          maxOccupancy: num,
          minOccupancy: num,
          monthlyRent: `unit ${num} monthlyRent ${i}`,
          numBathrooms: num,
          numBedrooms: num,
          number: `unit ${num} number ${i}`,
          sqFeet: i,
          monthlyRentAsPercentOfIncome: i,
          bmrProgramChart: true,
          unitType: { id: unitType.id },
          unitRentType: { id: unitRentType.id },
          priorityType: { id: unitAccessibilityPriorityType.id },
          amiChartOverride: {
            items: [
              {
                percentOfAmi: i,
                householdSize: i,
                income: i,
              },
            ],
          },
        });
      }
      return toReturn;
    };

    const createUnitsSummary = (num: number) => {
      const toReturn = [];
      for (let i = 0; i < 100; i++) {
        toReturn.push({
          unitType: { id: unitType.id },
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
          priorityType: { id: unitAccessibilityPriorityType.id },
          totalCount: i,
          totalAvailable: i,
        });
      }
      return toReturn;
    };

    for (let i = 0; i < 1000; i++) {
      await this.listingRepository.save({
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
          ListingApplicationAddressType.leasingAgent,
        applicationDropOffAddressType:
          ListingApplicationAddressType.leasingAgent,
        applicationMailingAddressType:
          ListingApplicationAddressType.leasingAgent,

        applicationMethods: [
          {
            type: ApplicationMethodType.Internal,
            label: 'applicationMethods label',
            externalReference: 'applicationMethods ',
            acceptsPostmarkedApplications: true,
            phoneNumber: 'applicationMethods phoneNumber',
            paperApplications: [
              {
                language: Language.en,
                file: { id: asset.id },
              },
            ],
          },
        ],
        buildingAddress: { id: address.id },
        applicationPickUpAddress: { id: address.id },
        applicationDropOffAddress: { id: address.id },
        applicationMailingAddress: { id: address.id },
        leasingAgentAddress: { id: address.id },
        buildingSelectionCriteriaFile: { id: asset.id },
        result: { id: asset.id },
        assets: [{ id: asset.id }],
        utilities: {
          water: true,
          gas: true,
          trash: true,
          sewer: true,
          electricity: true,
          cable: true,
          phone: true,
          internet: true,
        },
        features: {
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
        jurisdiction: { id: juris.id },
        status: ListingStatus.active,
        reviewOrderType: ListingReviewOrder.firstComeFirstServe,
        reservedCommunityType: { id: reservedCommunityType.id },
        units: createUnits(i),
        unitsSummary: createUnitsSummary(i),
      });
    }
  }

  // helper functions
  validateListing(l: Listing, num: number): string {
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
      ListingApplicationAddressType.leasingAgent
    ) {
      return 'applicationPickUpAddressType';
    }
    if (
      l.applicationDropOffAddressType !==
      ListingApplicationAddressType.leasingAgent
    ) {
      return 'applicationDropOffAddressType';
    }
    if (
      l.applicationMailingAddressType !==
      ListingApplicationAddressType.leasingAgent
    ) {
      return 'applicationMailingAddressType';
    }
    if (!this.validateAddress(l.buildingAddress)) {
      return 'buildingAddress';
    }
    if (!this.validateAddress(l.applicationPickUpAddress)) {
      return 'applicationPickUpAddress';
    }
    if (!this.validateAddress(l.applicationDropOffAddress)) {
      return 'applicationDropOffAddress';
    }
    if (!this.validateAddress(l.applicationMailingAddress)) {
      return 'applicationMailingAddress';
    }
    if (!this.validateAddress(l.leasingAgentAddress)) {
      return 'leasingAgentAddress';
    }
    if (!this.validateAsset(l.buildingSelectionCriteriaFile)) {
      return 'buildingSelectionCriteriaFile';
    }
    if (!this.validateAsset(l.result)) {
      return 'result';
    }
    if (!this.validateUtilities(l.utilities)) {
      return 'utilities';
    }
    if (!this.validateFeatures(l.features)) {
      return 'features';
    }
    if (l.status !== ListingStatus.active) {
      return 'status';
    }
    if (l.reviewOrderType !== ListingReviewOrder.firstComeFirstServe) {
      return 'reviewOrderType';
    }
    if (!this.validateJurisdiction(l.jurisdiction)) {
      return 'jurisdiction';
    }
    if (!this.validateReservedCommunityType(l.reservedCommunityType)) {
      return 'reservedCommunityType';
    }
    if (
      !l.applicationMethods.every((a) => this.validateApplicationMethods(a))
    ) {
      return 'applicationMethods';
    }
    if (!this.validateUnits(l.units, num)) {
      return 'units';
    }
    if (!this.validateUnitsSummary(l.unitsSummary, num)) {
      return 'validateUnitsSummary';
    }
    return 'all good';
  }

  validateAddress(a: Address): boolean {
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

  validateAsset(a: Asset): boolean {
    if (a.fileId !== 'Asset fileId') {
      return false;
    }
    if (a.label !== 'Asset label') {
      return false;
    }
    return true;
  }

  validateUtilities(a: ListingUtilities): boolean {
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

  validateFeatures(a: ListingFeatures): boolean {
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

  validateJurisdiction(a: Jurisdiction): boolean {
    if (a.name !== 'Jurisdiction name') {
      return false;
    }
    if (a.notificationsSignUpURL !== 'Jurisdiction notificationsSignUpURL') {
      return false;
    }
    if (a.languages[0] !== Language.en || a.languages[1] !== Language.es) {
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

  validateReservedCommunityType(a: ReservedCommunityType): boolean {
    if (a.name !== 'ReservedCommunityType name') {
      return false;
    }
    if (a.description !== 'ReservedCommunityType description') {
      return false;
    }
    if (!this.validateJurisdiction(a.jurisdiction)) {
      return false;
    }
    return true;
  }

  validateApplicationMethods(a: ApplicationMethod): boolean {
    if (a.type !== ApplicationMethodType.Internal) {
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
      !a.paperApplications.every((app) => this.validatePaperApplications(app))
    ) {
      return false;
    }
    return true;
  }

  validatePaperApplications(a: PaperApplication): boolean {
    if (a.language !== Language.en) {
      return false;
    }
    if (!this.validateAsset(a.file)) {
      return false;
    }
    return true;
  }

  validateUnits(units: Unit[], num: number): boolean {
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
      if (unit.sqFeet !== `${i}.00`) {
        return false;
      }
      if (unit.monthlyRentAsPercentOfIncome !== `${i}.00`) {
        return false;
      }
      if (unit.bmrProgramChart !== true) {
        return false;
      }
      if (!this.validateAmiChart(unit.amiChart)) {
        return false;
      }
      if (!this.validateUnitType(unit.unitType)) {
        return false;
      }
      if (!this.validateUnitRentType(unit.unitRentType)) {
        return false;
      }
      if (!this.validatePriorityType(unit.priorityType)) {
        return false;
      }
    }
    return true;
  }

  validateAmiChart(a: AmiChart): boolean {
    if (!this.validateItems(a.items)) {
      return false;
    }
    if (a.name !== 'amiChart name') {
      return false;
    }
    if (!this.validateJurisdiction(a.jurisdiction)) {
      return false;
    }
    return true;
  }

  validateItems(items: AmiChartItem[]): boolean {
    return items.every((item) => {
      if (item.percentOfAmi !== 0) {
        return false;
      }
      if (item.householdSize !== 0) {
        return false;
      }
      if (item.income !== 0) {
        return false;
      }
      return true;
    });
  }

  validateUnitType(a: UnitType): boolean {
    if (a.name !== 'unitType name') {
      return false;
    }
    if (a.numBedrooms !== 2) {
      return false;
    }

    return true;
  }

  validateUnitRentType(a: UnitRentType): boolean {
    if (a.name !== 'unitRentType name') {
      return false;
    }

    return true;
  }

  validatePriorityType(a: UnitAccessibilityPriorityType): boolean {
    if (a.name !== 'unitAccessibilityPriorityType name') {
      return false;
    }

    return true;
  }

  validateUnitsSummary(summaries: UnitsSummary[], num: number): boolean {
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
      if (s.monthlyRentAsPercentOfIncome !== `${i}.00`) {
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
      if (s.sqFeetMin !== `${i}.00`) {
        return false;
      }
      if (s.sqFeetMax !== `${i}.00`) {
        return false;
      }
      if (s.totalCount !== i) {
        return false;
      }
      if (s.totalAvailable !== i) {
        return false;
      }
      if (!this.validateUnitType(s.unitType)) {
        return false;
      }
      if (!this.validatePriorityType(s.priorityType)) {
        return false;
      }
    }
    return true;
  }
}
