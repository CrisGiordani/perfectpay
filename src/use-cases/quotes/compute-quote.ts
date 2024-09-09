import { QuotesRepository } from '@/repositories/quotes-repository'

interface ComputeQuoteUseCaseRequest {
    tag: string
    tags: string[]
    qnt: number
    unidade: string
}
export class ComputeQuoteUseCase {
    constructor(private quotesRepository: QuotesRepository) {}

    async execute(data: ComputeQuoteUseCaseRequest): Promise<Object[]> {
        const { tag, tags, qnt, unidade } = data;
        const result = await this.quotesRepository.compute(tag, tags, qnt, unidade);
        return result
    }
}
