import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { ListCompanySalesUseCase } from "../list-company-sales"

export function makeListCompanySalesUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new ListCompanySalesUseCase(companiesRepository)

    return useCase
}