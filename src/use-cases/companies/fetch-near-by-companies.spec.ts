import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompaniesRepository } from '../../repositories/in-memory/in-memory-companies-repository'
import { FetchNearByCompaniesUseCase } from './fetch-near-by-companies'

let companiesRepository: InMemoryCompaniesRepository
let fetchNearByCompaniesUseCase: FetchNearByCompaniesUseCase
describe('Fetch near by companies use case', () => {
  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository()
    fetchNearByCompaniesUseCase = new FetchNearByCompaniesUseCase(companiesRepository)
  })

  it('Should be able to fetch near by companies (10km limit)', async () => {
    await companiesRepository.create({
      id: 'company-01',
      responsavel: 'user-01',
      fornecedor: true,
      comprador: false,
      nome_fantasia: 'Near Company 01',
      razao_social: 'F 0 1 Ltda',
      cnpj: '22995509000154',
      latitude: new Decimal(-15.8399918),
      longitude: new Decimal(-47.8136491),
    })

    await companiesRepository.create({
      id: 'company-02',
      responsavel: 'user-02',
      fornecedor: true,
      comprador: false,
      nome_fantasia: 'Far Company 01',
      razao_social: 'F 0 2 Ltda',
      cnpj: '22995509000154',
      latitude: new Decimal(-18.8399918),
      longitude: new Decimal(-42.8136491),
    })

    const companies = await fetchNearByCompaniesUseCase.execute({
      latitude: -15.8399918,
      longitude: -47.8136491,
    })

    expect(companies).toHaveLength(1)
    expect(companies).toEqual([expect.objectContaining({ nome_fantasia: 'Near Company 01' })])
  })
})
