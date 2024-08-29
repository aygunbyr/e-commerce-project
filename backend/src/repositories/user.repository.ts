import { User, Prisma } from "@prisma/client";
import PrismaService from "../services/prisma.service";
import { Repository } from "../interfaces/repository.interface";

export default class UserRepository
  implements Repository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput>
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Partial<User>[]> {
    return await this.prismaService.user.findMany({
      select: { email: true, fullName: true, address: true },
    });
  }

  async findOne(id: number): Promise<Partial<User> | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: { email: true, fullName: true, address: true },
    });
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput
  ): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
