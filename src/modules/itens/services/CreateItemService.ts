import AppError from '@shared/errors/Error';
import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Item';
import { ItemRepository } from '../typeorm/repositories/ItemRepository';

interface IRequest {
  name: string;
  type: string;
  quote: string;
  attack: number;
  defense: number;
  weight: number;
}

class CreateItemService {
  public async execute({ name, type, quote, attack, defense, weight}: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);
    const itemExists = await itemsRepository.findByName(name);

    if (itemExists) {
      throw new AppError('The item already exists.');
    }

    const item = itemsRepository.create({
      name,
      type,
      quote,
      attack,
      defense,
      weight
    });

    await itemsRepository.save(item);
    return item;
  }
}

export default CreateItemService;
