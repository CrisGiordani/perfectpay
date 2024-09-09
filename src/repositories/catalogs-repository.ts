import { Prisma } from "@prisma/client"


export interface CatalogsRepository {
    include(data: Prisma.CatalogUncheckedCreateInput): Promise<void>
    remove(data: string[]): Promise<void>
    fetch(id_fornecedores: string[], page?: number): Promise<Object[] | null>
}
