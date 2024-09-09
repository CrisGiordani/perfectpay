import { PrismaQuotesRepository } from "@/repositories/prisma/prisma-quotes-repository"
import { ComputeQuoteUseCase } from "../compute-quote"

export function makeComputeQuoteUseCase() {
    const quotesRepository = new PrismaQuotesRepository
    const useCase = new ComputeQuoteUseCase(quotesRepository)

    return useCase
}