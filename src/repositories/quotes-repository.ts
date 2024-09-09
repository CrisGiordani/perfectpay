
interface Items {
    id_fornecedor: string
    valor: number,
    produtos: object
}
export interface QuotesRepository {
    compute(tag: String, tags: String[], qnt: number, unidade: string): Promise<Items[]>
    getTags(tag: String): Promise<Object>
}