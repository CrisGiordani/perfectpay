import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CatalogsRepository } from "../catalogs-repository";


export class PrismaCatalogsRepository implements CatalogsRepository {

    async include(data: Prisma.CatalogUncheckedCreateInput) {
        try {
            const produto = await prisma.product.findFirst({
                where: {
                    id: data.id_produto
                }, select: {
                    id: true,
                    quantidade: true
                }
            })

            if (produto) { data.valor_medio = data.valor / produto.quantidade }

            await prisma.catalog.create({
                data
            });

        } catch (err) {
            throw new Error(`Erro ao adicionar item no catálogo: ${err}`);
        }
    }

    async remove(ids: string[]) {
        try {
            const result = await prisma.catalog.deleteMany({
                where: {
                    id: { in: ids },
                },
            })
        } catch (err) {
            throw new Error(`Erro ao remover itens do catálogo: ${err}`);
        }
    }

    async fetch(id_fornecedores: string[]) {
        try {
            const result: Object[] = await prisma.$queryRaw`
            SELECT
                catalogs.id_produto,
                products.nome,
                products.descricao,
                products.marca,
                products.embalagem,
                products.unidade,
                products.ncm,
                products.cod_barras,
                products.imagens,
                JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id_fornecedor', companies.id,
                    'nome_fantasia', companies.nome_fantasia,
                    'cnpj', companies.cnpj,
                    'valor', catalogs.valor
                )
                ) AS fornecedores
            FROM catalogs
            INNER JOIN products ON catalogs.id_produto = products.id
            INNER JOIN companies ON catalogs.id_fornecedor = companies.id
            GROUP BY catalogs.id_produto, products.nome, products.descricao, products.marca, products.embalagem, products.unidade, catalogs.valor, products.ncm, products.cod_barras, products.imagens
            `;

            const items = result.map((row: any) => ({
                id_produto: row.id_produto,
                nome: row.nome,
                descricao: row.descricao,
                marca: row.marca,
                embalagem: row.embalagem,
                unidade: row.unidade,
                ncm: row.ncm,
                cod_barras: row.cod_barras,
                imagens: row.imagens,
                fornecedor: row.fornecedores,
            }));

            return items

        } catch (err) {
            throw new Error(`Erro ao listar catálogo: ${err}`);
        }
    }
}
