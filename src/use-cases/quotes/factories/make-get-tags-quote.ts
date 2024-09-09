import { PrismaQuotesRepository } from "@/repositories/prisma/prisma-quotes-repository"
import { GetTagsQuoteUseCase } from "../get-tags-quote"

export function makeGetTagsQuoteUseCase() {
    const quotesRepository = new PrismaQuotesRepository
    const useCase = new GetTagsQuoteUseCase(quotesRepository)

    return useCase
}