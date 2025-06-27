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

  /**
   * Creates a new company in the database.
   *
   * @param {CreateCompanyDto} dto - Data transfer object containing the details of the company to create.
   * @returns {Promise<Company>} The created company entity.
   */
  async create(dto: CreateCompanyDto): Promise<Company> {
    return await this.companyRepository.save(dto);
  }

  /**
   * Retrieves a filtered list of companies based on the provided query filter.
   *
   * @param {CompanyQueryFilterDto} queryFilter - The filter criteria for querying companies.
   * @returns {Promise<EntityFilteredListResults<Company>>} A tuple containing the list of companies,
   * the count of companies in the current page, and the total number of results.
   */
  async findAll(queryFilter: CompanyQueryFilterDto): EntityFilteredListResults<Company> {
    const [companies, totalResults] = await getEntityFilteredList({
      repository: this.companyRepository,
      queryFilter,
      withDeleted: true,
    });
    return [companies, companies.length, totalResults];
  }

  /**
   * Finds a single company by its ID.
   *
   * @param {number} id - The ID of the company to retrieve.
   * @returns {Promise<Company>} The company entity if found.
   * @throws {CompanyNotFoundException} If no company is found with the given ID.
   */
  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id }, withDeleted: true });

    if (!company) throw new CompanyNotFoundException({ id });

    return company;
  }

  async findOneBySiret(siretNumber: string): Promise<Company | null> {
    return await this.companyRepository.findOneBy({ siretNumber });
  }

  /**
   * Updates an existing company with new data.
   *
   * @param {number} id - The ID of the company to update.
   * @param {UpdateCompanyDto} dto - Data transfer object containing the updated company details.
   * @returns {Promise<Company>} The updated company entity.
   */
  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    return await this.companyRepository.save({ ...company, ...dto });
  }

  /**
   * Archives a company by performing a soft delete.
   *
   * @param {Company} company - The company entity to archive.
   * @returns {Promise<CompanyUpdatedResponse>} A response object containing the archived company's details.
   */
  async archiveCompany(company: Company): Promise<CompanyUpdatedResponse> {
    await this.companyRepository.softDelete(company.id);
    return { message: 'Company archived', id: company.id, name: company.name };
  }

  /**
   * Restores a previously archived company.
   *
   * @param {Company} company - The company entity to restore.
   * @returns {Promise<CompanyUpdatedResponse>} A response object containing the restored company's details.
   */
  async restoreCompany(company: Company): Promise<CompanyUpdatedResponse> {
    await this.companyRepository.restore(company.id);
    return { message: 'Company restored', id: company.id, name: company.name };
  }
}
