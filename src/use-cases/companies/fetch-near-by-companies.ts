import { CompaniesRepository } from '@/repositories/companies-repository'

interface FetchNearByCompaniesUseCaseRequest {
  latitude: number
  longitude: number
}
export class FetchNearByCompaniesUseCase {
  constructor(private companiesRepository: CompaniesRepository) { }

  async execute({
    latitude,
    longitude,
  }: FetchNearByCompaniesUseCaseRequest): Promise<Object[]> {
    const companies = await this.companiesRepository.fetchNearBy({
      latitude,
      longitude,
    })

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
