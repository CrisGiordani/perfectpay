import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository"
import { CreateCompanyUseCase } from "../create-company"

export function makeCreateCompanyUseCase() {
    const companiesRepository = new PrismaCompaniesRepository
    const useCase = new CreateCompanyUseCase(companiesRepository)

    return useCase
}