export interface Repository<T, CreateDto, UpdateDto> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(createDto: CreateDto): Promise<T>;
  update(id: number, updateDto: UpdateDto): Promise<T>;
  delete(id: number): Promise<T>;
}
