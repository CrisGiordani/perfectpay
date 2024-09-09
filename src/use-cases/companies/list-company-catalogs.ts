import { CompaniesRepository } from '@/repositories/companies-repository'
import { Catalog } from '@prisma/client'

interface ListCompanyCatalogsUseCaseRequest {
    id: string,
}

export class ListCompanyCatalogsUseCase {
    constructor(private companiesRepository: CompaniesRepository) { }

    async execute({ id }: ListCompanyCatalogsUseCaseRequest): Promise<Catalog[]> {
        const catalogs = await this.companiesRepository.catalogs(id)

        if (!catalogs) return []

        return catalogs
    }
}
