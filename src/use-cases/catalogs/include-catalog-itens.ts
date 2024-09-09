import { CatalogsRepository } from '@/repositories/catalogs-repository'
import { Prisma } from '@prisma/client'

export class IncludeCatalogItensUseCase {
    constructor(private catalogsRepository: CatalogsRepository) { }

    async execute(catalogItems: Prisma.CatalogUncheckedCreateInput): Promise<void> {
        await this.catalogsRepository.include(catalogItems)
    }
}
