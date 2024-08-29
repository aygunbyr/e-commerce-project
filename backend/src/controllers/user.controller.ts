import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Prisma, User } from "@prisma/client";
import UserService from "../services/user.service";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userService.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { password, fullName, address } = req.body;
    const userUpdateDto: Prisma.UserUpdateInput = {};
    if (!req?.params?.id || (!fullName && !address)) {
      return res.status(400).json({ error: "Bad request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userUpdateDto.password = hashedPassword;
    }
    if (fullName) {
      userUpdateDto.fullName = fullName;
    }
    if (address) {
      userUpdateDto.address = address;
    }
    try {
      const user = await this.userService.update(parsedId, userUpdateDto);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<any> {
    if (req?.params?.id) {
      const parsedId = Number.parseInt(req.params.id);
      const user = await this.userService.findOne(parsedId);
      return res.json(user);
    }
    return res.sendStatus(404);
  }
}
