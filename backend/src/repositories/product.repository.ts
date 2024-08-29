import { Prisma, Product } from "@prisma/client";
import { Repository } from "../interfaces/repository.interface";
import PrismaService from "../services/prisma.service";

export default class ProductRepository
  implements
    Repository<Product, Prisma.ProductCreateInput, Prisma.ProductUpdateInput>
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.prismaService.product.findUnique({
      where: { id },
    });
  }

  async create(createProductDto: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prismaService.product.create({ data: createProductDto });
  }

  async update(
    id: number,
    updateProductDto: Prisma.ProductUpdateInput
  ): Promise<Product> {
    return await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async delete(id: number): Promise<Product> {
    return await this.prismaService.product.delete({
      where: { id },
    });
  }
}
