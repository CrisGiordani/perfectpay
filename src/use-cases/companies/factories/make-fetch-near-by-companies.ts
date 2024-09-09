import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { FetchNearByCompaniesUseCase } from "../fetch-near-by-companies"

export function makeFetchNearByCompaniesUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new FetchNearByCompaniesUseCase(companiesRepository)

    return useCase
}