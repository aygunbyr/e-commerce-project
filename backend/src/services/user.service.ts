import { User, Prisma } from "@prisma/client";
import UserRepository from "../repositories/user.repository";

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput
  ): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }
}
