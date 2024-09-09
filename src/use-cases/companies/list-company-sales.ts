import { CompaniesRepository } from '@/repositories/companies-repository'

interface ListCompanySalesUseCaseRequest {
    id: string,
}

export class ListCompanySalesUseCase {
    constructor(private companiesRepository: CompaniesRepository) { }

    async execute({ id }: ListCompanySalesUseCaseRequest): Promise<Object[]> {
        const orders = await this.companiesRepository.sales(id)

        if (!orders) return []

        return orders
    }
}
