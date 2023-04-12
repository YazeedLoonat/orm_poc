import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { jurisdictions } from '@prisma/client';

@Injectable()
export class PrismaJurisdictionService {
  constructor(private prisma: PrismaService) {}

  async getRecords(): Promise<jurisdictions[]> {
    return this.prisma.jurisdictions.findMany();
  }
}
