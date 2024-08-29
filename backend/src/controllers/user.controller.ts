import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import UserService from "../services/user.service";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  async findOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req?.params?.id) {
      return res.sendStatus(400).json({ error: "Bad Request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    try {
      const user = await this.userService.findOne(parsedId);
      if (!user) {
        return res.status(404).json({ error: "Not Found" });
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Bad Request" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUserDto: Prisma.UserCreateInput = {
        email,
        password: hashedPassword,
      };
      const user = await this.userService.create(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { password, fullName, address } = req.body;
    if (!req?.params?.id || (!fullName && !address)) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    const updateUserDto: Prisma.UserUpdateInput = {};
    if (fullName) updateUserDto.fullName = fullName;
    if (address) updateUserDto.address = address;

    try {
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateUserDto.password = hashedPassword;
      }
      const user = await this.userService.update(parsedId, updateUserDto);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req?.params?.id) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    const user = await this.userService.delete(parsedId);
    res.json(user);
  }
}
