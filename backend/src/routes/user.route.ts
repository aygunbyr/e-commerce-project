import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import PrismaService from "../services/prisma.service";

const router = Router();
const prismaService = PrismaService.getInstance();
const userRepository = new UserRepository(prismaService);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", userController.register.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.patch("/:id", userController.update.bind(userController));

export default router;
