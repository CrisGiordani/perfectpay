import { CompaniesRepository } from '@/repositories/companies-repository'

interface SearchCompaniesUseCaseRequest {
  query: string
  page: number
}

export class SearchCompaniesUseCase {
  constructor(private companiesRepository: CompaniesRepository) { }

  async execute({
    query,
    page,
  }: SearchCompaniesUseCaseRequest): Promise<Object[]> {
    const companies = await this.companiesRepository.searchMany(query, page)

    if (!companies) return [{}]

    const filteredCompanies = companies.map(company => ({
      id: company.id,
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
