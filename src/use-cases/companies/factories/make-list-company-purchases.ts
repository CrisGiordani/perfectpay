import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { ListCompanyPurchasesUseCase } from "../list-company-purchases"

export function makeListCompanyPurchasesUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new ListCompanyPurchasesUseCase(companiesRepository)

    return useCase
}