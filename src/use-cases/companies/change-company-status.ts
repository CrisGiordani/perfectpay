import { CompaniesRepository } from '@/repositories/companies-repository'
import { Status } from '@prisma/client'

interface ChangeStatusCompanyUseCaseRequest {
    id: string,
    status: Status
}
export class ChangeStatusCompanyUseCase {
    constructor(private companiesRepository: CompaniesRepository) { }

    async execute({
        id,
        status
    }: ChangeStatusCompanyUseCaseRequest): Promise<null> {
        await this.companiesRepository.changeStatus(id, status)

        return null
    }
}
