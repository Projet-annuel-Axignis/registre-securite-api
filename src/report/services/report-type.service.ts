import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { Repository } from 'typeorm';
import { CreateReportTypeDto } from '../dto/create-report-type.dto';
import { ReportTypeQueryFilterDto } from '../dto/report-type-query-filter.dto';
import { UpdateReportTypeDto } from '../dto/update-report-type.dto';
import { ReportType } from '../entities/report-type.entity';
import {
  ReportTypeAlreadyExistsException,
  ReportTypeInUseException,
  ReportTypeNotFoundException,
} from '../helpers/exceptions/report-type.exception';

@Injectable()
export class ReportTypeService {
  constructor(
    @InjectRepository(ReportType)
    private readonly reportTypeRepository: Repository<ReportType>,
  ) {}

  async create(createReportTypeDto: CreateReportTypeDto): Promise<ReportType> {
    // Check if report type with the same code already exists
    const existingReportType = await this.reportTypeRepository.findOne({
      where: { code: createReportTypeDto.code },
    });

    if (existingReportType) {
      throw new ReportTypeAlreadyExistsException({ code: createReportTypeDto.code });
    }

    // Create new report type
    const reportType = this.reportTypeRepository.create(createReportTypeDto);

    return await this.reportTypeRepository.save(reportType);
  }

  async findAll(queryFilter: ReportTypeQueryFilterDto): EntityFilteredListResults<ReportType> {
    const [reportTypes, totalResults] = await getEntityFilteredList({
      repository: this.reportTypeRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      searchFields: ['code', 'name'],
    });
    return [reportTypes, reportTypes.length, totalResults];
  }

  async findOne(code: string): Promise<ReportType> {
    const reportType = await this.reportTypeRepository.findOne({
      where: { code },
    });

    if (!reportType) {
      throw new ReportTypeNotFoundException({ code });
    }

    return reportType;
  }

  async update(code: string, updateReportTypeDto: UpdateReportTypeDto): Promise<ReportType> {
    const reportType = await this.findOne(code);

    const { code: newCode, name, periodicity } = updateReportTypeDto;

    // Check if the new code already exists (if code is being updated)
    if (newCode && newCode !== code) {
      const existingReportType = await this.reportTypeRepository.findOne({
        where: { code: newCode },
      });

      if (existingReportType) {
        throw new ReportTypeAlreadyExistsException({ code: newCode });
      }
    }

    // Update fields if provided
    if (newCode) {
      reportType.code = newCode;
    }
    if (name) {
      reportType.name = name;
    }
    if (periodicity) {
      reportType.periodicity = periodicity;
    }

    return await this.reportTypeRepository.save(reportType);
  }

  async delete(code: string): Promise<void> {
    const reportType = await this.findOne(code);

    // Check if the report type is being used by any reports
    const reportsCount = await this.reportTypeRepository
      .createQueryBuilder('reportType')
      .leftJoin('reportType.reports', 'report')
      .where('reportType.code = :code', { code })
      .andWhere('report.id IS NOT NULL')
      .getCount();

    if (reportsCount > 0) {
      throw new ReportTypeInUseException({
        code,
        reportsCount,
        message: `Cannot delete report type '${code}' as it is being used by ${reportsCount} report(s)`,
      });
    }

    // If not in use, proceed with deletion
    await this.reportTypeRepository.remove(reportType);
  }
}
