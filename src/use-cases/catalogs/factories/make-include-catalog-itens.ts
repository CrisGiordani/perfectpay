import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository"
import { IncludeCatalogItensUseCase } from "../include-catalog-itens"

export function makeIncludeCatalogItensUseCase() {
    const catalogsRepository = new PrismaCatalogsRepository
    const useCase = new IncludeCatalogItensUseCase(catalogsRepository)

    return useCase
}