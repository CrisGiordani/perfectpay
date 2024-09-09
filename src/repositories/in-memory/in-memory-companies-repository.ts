import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Company, Prisma, Status } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CompaniesRepository, fetchNearByParams } from '../companies-repository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async fetch(page: number) {
    const companies = this.items.sort()
      .slice((page - 1) * 20, page * 20)

    if (!companies) {
      return null
    }
    return companies
  }

  async findById(id: string) {
    const company = this.items.find((item) => item.id === id)

    if (!company) {
      return null
    }

    return company
  }

  async findByCnpj(cnpj: string) {
    const company = this.items.find((item) => item.cnpj === cnpj)

    if (!company) {
      return null
    }

    return company
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.nome_fantasia.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.CompanyCreateInput) {
    const company = {
      id: randomUUID(),
      responsavel: 'user-1',
      fornecedor: true,
      comprador: false,
      nome_fantasia: data.nome_fantasia,
      razao_social: data.razao_social,
      cnpj: data.cnpj,
      endereco: data.endereco || null,
      cidade: data.cidade || null,
      uf: data.uf || null,
      cep: data.cep || null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      detalhes: data.detalhes || Object({}),
      status: data.status || 'WAITING_APPROVAL',
      aproved_by: data.aproved_by || 'admin-1',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(company)

    return company
  }

  async fetchNearBy(params: fetchNearByParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      )

      return distance < 10
    })
  }

  async changeStatus(id: string, status: Status) {
    const company = this.items.map(company => {
      if (company.id === id) {
        return { ...company, status }
      }
    })

    return null
  }
}
