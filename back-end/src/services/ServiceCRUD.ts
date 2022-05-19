import { ModelCRUD } from '../interfaces';

abstract class ServiceCRUD<T> {
  constructor(protected model: ModelCRUD<T>) { }

  public async create(obj: T): Promise<T | null> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): 
  Promise<T | null> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}

export default ServiceCRUD;
