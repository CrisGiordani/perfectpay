import { prisma } from "@/lib/prisma";
import { Company, Prisma, Status } from "@prisma/client";
import { CompaniesRepository, fetchNearByParams } from "../companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
    async create(data: Prisma.CompanyCreateInput) {
        const company = await prisma.company.create({
            data,
        })

        return company
    }

    async findById(id: string) {
        const company = await prisma.company.findUnique({
            where: {
                id,
            },
            include: { catalogo: true }
        })
        return company
    }

    async findByCnpj(cnpj: string) {
        const company = await prisma.company.findUnique({
            where: {
                cnpj,
            }
        })
        return company
    }

    async searchMany(query: string, page?: number) {
        if (!page) page = 1
        const companies = await prisma.company.findMany({
            where: {
                nome_fantasia: {
                    contains: query,
                }
            },
            take: 20,
            skip: (page - 1) * 20,
        })
        return companies
    }

    async fetchNearBy({ latitude, longitude }: fetchNearByParams) {
        const companies = await prisma.$queryRaw<Company[]>`
            SELECT * from companies
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return companies
    }

    async fetch(page?: number) {
        if (!page) page = 1
        const companies = await prisma.company.findMany({
            where: {
                status: 'ACTIVE'
            },
            take: 20,
            skip: (page - 1) * 20,
        })
        return companies
    }

    async changeStatus(id: string, status: Status) {
        const company = await prisma.company.update({
            where: {
                id
            },
            data: {
                status: status
            }
        })
        return null
    }

    async purchases(id: string, page?: number) {
        if (!page) page = 1
        const orders = await prisma.company.findUnique({
            where: {
                id
            },
            include: {
                compras: {
                    take: 20,
                    skip: (page - 1) * 20,
                    include: {
                        fornecedor: {
                            select: {
                                razao_social: true,
                                nome_fantasia: true,
                                cnpj: true
                            }
                        },
                        itens: {
                            include: {
                                produto: {
                                    select: {
                                        nome: true,
                                        marca: true,
                                        descricao: true,
                                        embalagem: true,
                                        quantidade: true,
                                        unidade: true,
                                        imagens: true
                                    }
                                }
                            }
                        },
                        historico: true
                    }
                },
            },

        })
        return orders?.compras || [];
    }


    async sales(id: string, page?: number) {
        if (!page) page = 1
        const orders = await prisma.company.findUnique({
            where: {
                id
            },
            include: {
                vendas: {
                    take: 20,
                    skip: (page - 1) * 20,
                    include: {
                        comprador: {
                            select: {
                                razao_social: true,
                                nome_fantasia: true,
                                cnpj: true
                            }
                        },
                        itens: {
                            include: {
                                produto: {
                                    select: {
                                        nome: true,
                                        marca: true,
                                        descricao: true,
                                        embalagem: true,
                                        quantidade: true,
                                        unidade: true,
                                        imagens: true
                                    }
                                }
                            }
                        },
                        historico: true
                    }
                }
            },

        })
        return orders?.vendas || [];
    }

    async catalogs(id: string, page?: number) {
        if (!page) page = 1
        const orders = await prisma.company.findUnique({
            where: {
                id
            },
            include: {
                catalogo: {
                    take: 20,
                    skip: (page - 1) * 20,
                    include: {
                        produtos: true
                    }
                }
            },

        })
        return orders?.catalogo || [];
    }

    async shoppingList(id: string, page?: number) {
        if (!page) page = 1
        const shoppingList = await prisma.company.findUnique({
            where: {
                id
            },
            include: {
                lista_de_compras: {
                    take: 20,
                    skip: (page - 1) * 20,
                }
            },

        })
        return shoppingList?.lista_de_compras || [];
    }
}