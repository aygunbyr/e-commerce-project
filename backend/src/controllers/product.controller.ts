import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import ProductService from "../services/product.service";

export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  async findOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req?.params?.id) {
      return res.sendStatus(400).json({ error: "Bad Request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    try {
      const product = await this.productService.findOne(parsedId);
      if (!product) {
        return res.status(404).json({ error: "Not Found" });
      }
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const products = await this.productService.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { title, price, description } = req.body;
    if (!title || !price || !description) {
      return res.status(400).json({ error: "Bad Request" });
    }
    try {
      const createProductDto: Prisma.ProductCreateInput = {
        title,
        price,
        description,
      };
      const product = await this.productService.create(createProductDto);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { title, price, description, imageUrl } = req.body;
    if (!req?.params?.id || (!title && !price && !description && !imageUrl)) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    const updateProductDto: Prisma.ProductUpdateInput = {};
    if (title) updateProductDto.title = title;
    if (price) updateProductDto.price = price;
    if (description) updateProductDto.description = description;
    if (imageUrl) updateProductDto.imageUrl = imageUrl;

    try {
      const product = await this.productService.update(
        parsedId,
        updateProductDto
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req?.params?.id) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const parsedId = Number.parseInt(req.params.id);
    const product = await this.productService.delete(parsedId);
    res.json(product);
  }
}
