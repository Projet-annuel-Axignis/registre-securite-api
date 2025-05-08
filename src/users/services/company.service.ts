import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { Repository } from 'typeorm';
import { CompanyQueryFilterDto } from '../dto/company/company-query-filter.dto';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { UpdateCompanyDto } from '../dto/company/update-company.dto';
import { Company } from '../entities/company.entity';
import { CompanyNotFoundException } from '../helpers/exceptions/company.exception';
import { CompanyUpdatedResponse } from '../types/company.types';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    return await this.companyRepository.save(dto);
  }

  async findAll(queryFilter: CompanyQueryFilterDto): EntityFilteredListResults<Company> {
    const [companies, totalResults] = await getEntityFilteredList({
      repository: this.companyRepository,
      queryFilter,
      withDeleted: true,
    });
    return [companies, companies.length, totalResults];
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id }, withDeleted: true });

    if (!company) throw new CompanyNotFoundException({ id });

    return company;
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    return await this.companyRepository.save({ ...company, ...dto });
  }

  async archiveCompany(company: Company): Promise<CompanyUpdatedResponse> {
    await this.companyRepository.softDelete(company.id);
    return { message: 'Company archived', id: company.id, name: company.name };
  }

  async restoreCompany(company: Company): Promise<CompanyUpdatedResponse> {
    await this.companyRepository.restore(company.id);
    return { message: 'Company restored', id: company.id, name: company.name };
  }
}
