import { Prisma, Product } from "@prisma/client";
import ProductRepository from "../repositories/product.repository";
import { ResourceService } from "../interfaces/resource-service.interface";

export default class ProductService
  implements
    ResourceService<
      Product,
      Prisma.ProductCreateInput,
      Prisma.ProductUpdateInput
    >
{
  constructor(private readonly productRepository: ProductRepository) {}

  async findOne(id: number): Promise<Product | null> {
    return await this.productRepository.findOne(id);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async create(createProductDto: Prisma.ProductCreateInput): Promise<Product> {
    return await this.productRepository.create(createProductDto);
  }

  async update(
    id: number,
    updateProductDto: Prisma.ProductUpdateInput
  ): Promise<Product> {
    return await this.productRepository.update(id, updateProductDto);
  }

  async delete(id: number): Promise<Product> {
    return await this.productRepository.delete(id);
  }
}
