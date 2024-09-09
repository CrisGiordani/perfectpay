import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository"
import { FetchCatalogByCompanyUseCase } from "../fetch-catalog-by-company"

export function makeFetchCatalogByCompanyUseCase() {
    const catalogsRepository = new PrismaCatalogsRepository
    const useCase = new FetchCatalogByCompanyUseCase(catalogsRepository)

    return useCase
}