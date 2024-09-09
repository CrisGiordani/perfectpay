import { prisma } from "@/lib/prisma";
import { Prisma, StatusOrder } from "@prisma/client";
import { OrdersRepository } from "../orders-repository";

export class PrismaOrdersRepository implements OrdersRepository {
    async create(data: Prisma.OrderCreateManyInput) {
        try {
            console.log(data)
            await prisma.order.create({ data });
        } catch (err) {
            throw new Error(`Erro ao criar pedido: ${err}`);
        }
    }

    async fetch(page?: number) {
        if (!page) page = 1
        const orders = await prisma.order.findMany({
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
        })
        return orders
    }

    async changeStatus(id_order: string, status_order: StatusOrder, created_by: string) {
        await prisma.$transaction([
            prisma.order.update({
                where: {
                    id: id_order
                },
                data: {
                    status: status_order
                }
            }),
            prisma.ordersHistory.create({
                data: {
                    id_pedido: id_order,
                    status: status_order,
                    created_by
                },
            }),
        ]);
        return null
    }
}