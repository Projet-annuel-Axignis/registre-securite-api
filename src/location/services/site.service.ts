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

  /**
   * Crée un nouveau site.
   *
   * @param {CreateSiteDto} dto - Les données nécessaires pour créer un site.
   * @returns {Promise<Site>} Le site créé.
   * @throws {Error} Si la création échoue.
   */
  async create(dto: CreateSiteDto): Promise<Site> {
    const creatingSite = this.siteRepository.create(dto);

    if (dto.companyId) {
      const company = await this.companyService.findOne(dto.companyId);
      creatingSite.company = company;
    }

    return await this.siteRepository.save(creatingSite);
  }

  /**
   * Récupère une liste filtrée de sites.
   *
   * @param {SiteQueryFilterDto} queryFilter - Les filtres pour la requête.
   * @returns {Promise<EntityFilteredListResults<Site>>} Une liste des sites filtrés avec le nombre total de résultats.
   * @throws {Error} Si la récupération échoue.
   */
  async findAll(queryFilter: SiteQueryFilterDto): EntityFilteredListResults<Site> {
    const [sites, totalResults] = await getEntityFilteredList({
      repository: this.siteRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
    });
    return [sites, sites.length, totalResults];
  }

  /**
   * Récupère un site par son identifiant.
   *
   * @param {number} id - L'identifiant du site à récupérer.
   * @returns {Promise<Site>} Le site correspondant à l'identifiant.
   * @throws {SiteNotFoundException} Si aucun site n'est trouvé avec cet identifiant.
   */
  async findOne(id: number): Promise<Site> {
    const site = await this.siteRepository.findOne({ where: { id }, withDeleted: true });

    if (!site) throw new SiteNotFoundException({ id });

    return site;
  }

  /**
   * Récupère un site par son identifiant.
   *
   * @param {number} id - L'identifiant du site à récupérer.
   * @returns {Promise<Site>} Le site correspondant à l'identifiant.
   * @throws {SiteNotFoundException} Si aucun site n'est trouvé avec cet identifiant.
   */
  async update(id: number, dto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);
    return await this.siteRepository.save({ ...site, ...dto });
  }

  /**
   * Archive un site par son identifiant.
   *
   * @param {number} id - L'identifiant du site à supprimer.
   * @returns {Promise<void>} Aucune valeur de retour.
   * @throws {SiteNotFoundException} Si aucun site n'est trouvé avec cet identifiant.
   */
  async archive(site: Site): Promise<SiteUpdatedResponse> {
    await this.siteRepository.softDelete(site.id);
    return { message: 'Site archived', id: site.id, name: site.name };
  }

  /**
   * Restaure un site supprimé par son identifiant.
   *
   * @param {number} id - L'identifiant du site à restaurer.
   * @returns {Promise<Site>} Le site restauré.
   * @throws {SiteNotFoundException} Si aucun site n'est trouvé avec cet identifiant.
   */
  async restore(site: Site): Promise<SiteUpdatedResponse> {
    await this.siteRepository.restore(site.id);
    return { message: 'Site restored', id: site.id, name: site.name };
  }
}
