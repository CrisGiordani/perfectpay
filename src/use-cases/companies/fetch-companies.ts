import { CompaniesRepository } from '@/repositories/companies-repository'
export class FetchCompaniesUseCase {
    constructor(private companiesRepository: CompaniesRepository) { }

    async execute(): Promise<Object[]> {
        const companies = await this.companiesRepository.fetch()

        if (!companies) return [{}]

        const filteredCompanies = companies.map(company => ({
            id: company.id,
            responsavel: company.responsavel,
            razao_social: company.razao_social,
            nome_fantasia: company.nome_fantasia,
            cnpj: company.cnpj,
            fornecedor: company.fornecedor,
            comprador: company.comprador,
            cidade: company.cidade,
            uf: company.uf,
            latitude: company.latitude,
            longitude: company.longitude,
        }))

        return filteredCompanies
    }
}
