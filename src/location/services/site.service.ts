import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { CompanyService } from '@src/users/services/company.service';
import { Repository } from 'typeorm';
import { CreateSiteDto } from '../dto/site/create-site.dto';
import { SiteQueryFilterDto } from '../dto/site/site-query-filter.dto';
import { UpdateSiteDto } from '../dto/site/update-site.dto';
import { Site } from '../entities/site.entity';
import { SiteNotFoundException } from '../helpers/exceptions/site.exception';
import { SiteUpdatedResponse } from '../types/site.types';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    private readonly companyService: CompanyService,
  ) {}

  async create(dto: CreateSiteDto): Promise<Site> {
    const creatingSite = this.siteRepository.create(dto);

    if (dto.companyId) {
      const company = await this.companyService.findOne(dto.companyId);
      creatingSite.company = company;
    }

    return await this.siteRepository.save(creatingSite);
  }

  async findAll(queryFilter: SiteQueryFilterDto): EntityFilteredListResults<Site> {
    const [sites, totalResults] = await getEntityFilteredList({
      repository: this.siteRepository,
      queryFilter,
      withDeleted: true,
    });
    return [sites, sites.length, totalResults];
  }

  async findOne(id: number): Promise<Site> {
    const site = await this.siteRepository.findOne({ where: { id }, withDeleted: true });

    if (!site) throw new SiteNotFoundException({ id });

    return site;
  }

  async update(id: number, dto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);
    return await this.siteRepository.save({ ...site, ...dto });
  }

  async archive(site: Site): Promise<SiteUpdatedResponse> {
    await this.siteRepository.softDelete(site.id);
    return { message: 'Site archived', id: site.id, name: site.name };
  }

  async restore(site: Site): Promise<SiteUpdatedResponse> {
    await this.siteRepository.restore(site.id);
    return { message: 'Site restored', id: site.id, name: site.name };
  }
}
