import { Catalog, Company, Order, Prisma, ShoppingList, Status } from '@prisma/client'

export interface fetchNearByParams {
  latitude: number
  longitude: number
}

export interface CompaniesRepository {
  create(data: Prisma.CompanyCreateInput): Promise<Company>
  findById(id: string): Promise<Company | null>
  findByCnpj(cnpj: string): Promise<Company | null>
  fetchNearBy(params: fetchNearByParams): Promise<Company[]>
  searchMany(query: string, page?: number): Promise<Company[]>
  fetch(page?: number): Promise<Company[] | null>
  changeStatus(id: string, status: Status): Promise<null>
  purchases(id: string, page?: number): Promise<Order[] | null>
  sales(id: string, page?: number): Promise<Order[] | null>
  catalogs(id: string, page?: number): Promise<Catalog[]>
  shoppingList(id: string, page?: number): Promise<ShoppingList[]>
}
