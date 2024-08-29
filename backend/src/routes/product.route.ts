import { Router } from "express";
import ProductController from "../controllers/product.controller";
import ProductRepository from "../repositories/product.repository";
import ProductService from "../services/product.service";
import PrismaService from "../services/prisma.service";

const router = Router();
const prismaService = PrismaService.getInstance();
const productRepository = new ProductRepository(prismaService);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get("/", productController.findAll.bind(productController));
router.get("/:id", productController.findOne.bind(productController));
router.post("/", productController.create.bind(productController));
router.patch("/:id", productController.update.bind(productController));
router.delete("/:id", productController.delete.bind(productController));

export default router;
