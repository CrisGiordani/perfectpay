import { CompaniesRepository } from '@/repositories/companies-repository'

interface ListCompanyPurchasesUseCaseRequest {
    id: string,
}

export class ListCompanyPurchasesUseCase {
    constructor(private companiesRepository: CompaniesRepository) { }

    async execute({ id }: ListCompanyPurchasesUseCaseRequest): Promise<Object[]> {
        const orders = await this.companiesRepository.purchases(id)

        if (!orders) return []

        return orders
    }
}
