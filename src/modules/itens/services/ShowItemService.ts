import AppError from '@shared/errors/Error';
import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Item';
import { ItemRepository } from '../typeorm/repositories/ItemRepository';

interface IRequest {
  id: string;
}

class ShowItemService {
  public async execute({ id }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);

    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Product not found');
    }

    return item;
  }
}

export default ShowItemService;
