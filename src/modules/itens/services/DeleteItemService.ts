import AppError from '@shared/errors/Error';
import { getCustomRepository } from 'typeorm';
import { ItemRepository } from '../typeorm/repositories/ItemRepository';

interface IRequest {
  id: string;
}

class DeleteItemService {
  public async execute({ id }: IRequest) {
    const itemsRepository = getCustomRepository(ItemRepository);

    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Product not found');
    }

    await itemsRepository.remove(item);
  }
}

export default DeleteItemService;
