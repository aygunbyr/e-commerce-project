import { User, Prisma } from "@prisma/client";
import PrismaService from "../services/prisma.service";

export default class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
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
