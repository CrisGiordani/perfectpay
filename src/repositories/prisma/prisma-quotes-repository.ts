import { prisma } from "@/lib/prisma";
import { QuotesRepository } from "../quotes-repository";

export class PrismaQuotesRepository implements QuotesRepository {

    async getTags(tag: string) {
        const result = await prisma.product.findMany({
            where: {
                tag,
            },
            select: {
                tags: true,
                marca: true,
                embalagem: true,
            }
        });
        const tags = result.map(item => item.tags).flat();
        const uniqueTags = [...new Set(tags)];
        const sortedUniqueTags = uniqueTags.sort();

        const marcas = result.map(item => item.marca).flat();
        const uniqueMarca = [...new Set(marcas)];
        const sortedUniqueMarcas = uniqueMarca.sort();

        const embalagens = result.map(item => item.embalagem).flat();
        const uniqueEmbalagens = [...new Set(embalagens)];
        const sortedUniqueEmbalagens = uniqueEmbalagens.sort();
        return {
            "marcas": sortedUniqueMarcas,
            "embalagens": sortedUniqueEmbalagens,
            "tags": sortedUniqueTags
        }

    }

    async compute(tag: string, tags: string[], qnt: number, unidade: string) {
        const catalogItems = await prisma.catalog.findMany({
            where: {
                produtos: {
                    tag,
                    tags: {
                        hasEvery: tags,
                    },
                },
            },
            select: {
                id: true,
                id_fornecedor: true,
                valor: true,
                produtos: {
                    select: {
                        id: true,
                        nome: true,
                        tags: true,
                        quantidade: true,
                        unidade: true,
                        descricao: true,
                    },
                },
                fornecedores: {
                    select: {
                        nome_fantasia: true
                    }
                }
            },
            orderBy: {
                valor_medio: 'asc',
            },
        });

        const produtosAjustados = catalogItems.map(item => {
            const unidadesNecessarias = Math.ceil(qnt / item.produtos.quantidade);
            const quantidadeReal = item.produtos.quantidade * unidadesNecessarias;
            const precoTotal = item.valor * unidadesNecessarias;
            const precoMedio = (precoTotal / quantidadeReal) * 1000;
            const variancia = 0.2;

            if (qnt <= (1 + variancia) * quantidadeReal && qnt >= (1 - variancia) * quantidadeReal) {
                return {
                    id: item.id,
                    id_fornecedor: item.id_fornecedor,
                    fornecedor: item.fornecedores.nome_fantasia,
                    valor: item.valor,
                    produtos: {
                        id: item.produtos.id,
                        nome: item.produtos.nome,
                        descricao: item.produtos.descricao,
                        tags: item.produtos.tags,
                        quantidade: item.produtos.quantidade,
                        unidade: item.produtos.unidade
                    },
                    pedir: {
                        unidades: unidadesNecessarias,
                        total: quantidadeReal,
                        valorTotal: precoTotal,
                        valorPor1000: precoMedio
                    }
                }
            }
            return null;
        }).filter(item => item !== null) as Array<{
            id: string,
            id_fornecedor: string;
            valor: number;
            produtos: {
                id: string,
                nome: string;
                tags: string[];
                quantidade: number;
                unidade: string;
            };
            pedir: {
                unidades: number;
                total: number;
                valorTotal: number;
                valorPor1000: number;
            };
        }>;


        produtosAjustados.sort((a, b) => a.pedir.valorPor1000 - b.pedir.valorPor1000);

        return produtosAjustados;
    }
}