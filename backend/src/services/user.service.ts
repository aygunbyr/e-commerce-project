import { User, Prisma } from "@prisma/client";
import UserRepository from "../repositories/user.repository";
import { ResourceService } from "../interfaces/resource-service.interface";

export default class UserService
  implements
    ResourceService<User, Prisma.UserCreateInput, Prisma.UserUpdateInput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput
  ): Promise<User> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number): Promise<User> {
    return await this.userRepository.delete(id);
  }
}
