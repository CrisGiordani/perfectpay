import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { FetchCompaniesUseCase } from "../fetch-companies"

export function makeFetchCompaniesUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new FetchCompaniesUseCase(companiesRepository)

    return useCase
}