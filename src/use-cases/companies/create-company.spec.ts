import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompaniesRepository } from '../../repositories/in-memory/in-memory-companies-repository'
import { CreateCompanyUseCase } from './create-company'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let createCompanyUseCase: CreateCompanyUseCase
describe('Create Company use case', () => {
  beforeEach(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    createCompanyUseCase = new CreateCompanyUseCase(inMemoryCompaniesRepository)
  })

  it('Should be able to create a company', async () => {
    const { company } = await createCompanyUseCase.execute({
      responsavel: 'user-01',
      fornecedor: true,
      comprador: false,
      nome_fantasia: 'Fornecedor 01',
      razao_social: 'F 0 1 Ltda',
      cnpj: '22995509000154',
      detalhes: {},
      latitude: -15.8399918,
      longitude: -47.8136491,
    })

    expect(company.id).toEqual(expect.any(String))
  })
})
