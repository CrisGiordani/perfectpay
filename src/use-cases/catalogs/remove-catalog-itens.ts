import { CatalogsRepository } from '@/repositories/catalogs-repository'

export class RemoveCatalogItensUseCase {
    constructor(private catalogsRepository: CatalogsRepository) { }

    async execute(catalogItens: string[]): Promise<void> {
        await this.catalogsRepository.remove(catalogItens)
    }
}
