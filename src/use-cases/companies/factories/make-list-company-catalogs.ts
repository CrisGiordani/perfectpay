import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { ListCompanyCatalogsUseCase } from "../list-company-catalogs"

export function makeListCompanyCatalogsUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new ListCompanyCatalogsUseCase(companiesRepository)

    return useCase
}