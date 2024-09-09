import { CatalogsRepository } from '@/repositories/catalogs-repository'

export class FetchCatalogByCompanyUseCase {
    constructor(private catalogsRepository: CatalogsRepository) { }

    async execute(id_fornecedores: string[]): Promise<Object[]> {
        const catalog = await this.catalogsRepository.fetch(id_fornecedores)

        if (!catalog) return []

        return catalog
    }
}
