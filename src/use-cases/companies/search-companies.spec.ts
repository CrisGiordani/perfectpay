import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompaniesRepository } from '../../repositories/in-memory/in-memory-companies-repository'
import { SearchCompaniesUseCase } from './search-companies'

let companiesRepository: InMemoryCompaniesRepository
let searchCompaniesUseCase: SearchCompaniesUseCase
describe('Search companies use case', () => {
  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository()
    searchCompaniesUseCase = new SearchCompaniesUseCase(companiesRepository)
  })

  it('Should be able to search company by title', async () => {
    await companiesRepository.create({
      id: 'company-01',
      responsavel: 'user-01',
      fornecedor: true,
      comprador: false,
      nome_fantasia: 'Fornecedor Nutella 01',
      razao_social: 'F 0 1 Ltda',
      cnpj: '22995509000154',
      latitude: 0,
      longitude: 0,
    })

    await companiesRepository.create({
      id: 'company-02',
      responsavel: 'user-02',
      fornecedor: true,
      comprador: false,
      nome_fantasia: 'Fornecedor Chocolate 02',
      razao_social: 'F 0 2 Ltda',
      cnpj: '22995509000154',
      latitude: 0,
      longitude: 0,
    })

    const companies = await searchCompaniesUseCase.execute({
      query: 'Chocolate',
      page: 1,
    })

    expect(companies).toHaveLength(1)
    expect(companies).toEqual([expect.objectContaining({ nome_fantasia: 'Fornecedor Chocolate 02' })])
  })

  it('Should be able to paginate search company result', async () => {
    for (let i = 1; i <= 22; i++) {
      await companiesRepository.create({
        responsavel: 'user-01',
        fornecedor: true,
        comprador: false,
        nome_fantasia: `Fornecedor Nutella ${i}`,
        razao_social: 'F 0 1 Ltda',
        cnpj: '22995509000154',
        latitude: 0,
        longitude: 0,
      })
    }

    const companies = await searchCompaniesUseCase.execute({
      query: 'Nutella',
      page: 2,
    })

    expect(companies).toHaveLength(2)
    expect(companies).toEqual([
      expect.objectContaining({ nome_fantasia: 'Fornecedor Nutella 21' }),
      expect.objectContaining({ nome_fantasia: 'Fornecedor Nutella 22' }),
    ])
  })
})
