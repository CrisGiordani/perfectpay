import { CompaniesRepository } from '@/repositories/companies-repository'
import { Company, Status, User } from '@prisma/client'
import { CompanyCnpjAlreadyExistsError } from './errors/company-cnpj-already-exists'

interface CreateCompanyUseCaseRequest<T = Record<string, any>> {
  responsavel: User["id"],
  fornecedor: boolean
  comprador: boolean
  razao_social: string
  nome_fantasia: string
  cnpj: string
  endereco?: string
  cidade?: string
  uf?: string,
  cep?: string,
  latitude: number
  longitude: number
  status: Status
  detalhes: T
}

interface CreateCompanyUseCaseResponse {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) { }

  async execute({
    responsavel,
    fornecedor,
    comprador,
    razao_social,
    nome_fantasia,
    cnpj,
    endereco,
    cidade,
    uf,
    cep,
    latitude,
    longitude,
    status,
    detalhes
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const companyWithSameCnpjl = await this.companiesRepository.findByCnpj(cnpj)

    if (companyWithSameCnpjl) {
      throw new CompanyCnpjAlreadyExistsError()
    }

    const company = await this.companiesRepository.create({
      User: { connect: { id: responsavel } },
      fornecedor,
      comprador,
      razao_social,
      nome_fantasia,
      cnpj,
      endereco,
      cidade,
      uf,
      cep,
      latitude,
      longitude,
      status,
      detalhes
    })

    return {
      company,
    }
  }
}
