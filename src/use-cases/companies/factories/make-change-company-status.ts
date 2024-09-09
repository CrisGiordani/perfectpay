import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { ChangeStatusCompanyUseCase } from "../change-company-status"

export function makeChangeStatusCompanyUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new ChangeStatusCompanyUseCase(companiesRepository)

    return useCase
}