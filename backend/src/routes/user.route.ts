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

router.get("/", userController.findAll.bind(userController));
router.get("/:id", userController.findOne.bind(userController));
router.post("/register", userController.create.bind(userController));
router.patch("/:id", userController.update.bind(userController));
router.delete("/:id", userController.delete.bind(userController));

export default router;
