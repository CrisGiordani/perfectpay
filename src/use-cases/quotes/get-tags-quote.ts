import { QuotesRepository } from '@/repositories/quotes-repository';

interface GetTagsQuoteUseCaseRequest {
    tag: string
}
export class GetTagsQuoteUseCase {
    constructor(private quotesRepository: QuotesRepository) {}

    async execute(data: GetTagsQuoteUseCaseRequest): Promise<Object> {
        const { tag } = data;
        const result = await this.quotesRepository.getTags(tag);
        return result
    }
}
