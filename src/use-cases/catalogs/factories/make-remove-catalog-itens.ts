import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository"
import { RemoveCatalogItensUseCase } from "../remove-catalog-itens"

export function makeRemoveCatalogItensUseCase() {
    const catalogsRepository = new PrismaCatalogsRepository
    const useCase = new RemoveCatalogItensUseCase(catalogsRepository)

    return useCase
}