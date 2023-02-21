import AppError from '@shared/errors/Error';
import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Item';
import { ItemRepository } from '../typeorm/repositories/ItemRepository';

interface IRequest {
  id: string;
  name: string;
  type: string;
  quote: string;
  attack: number;
  defense: number;
  weight: number;
}

class UpdateItemService {
  public async execute({
    id,
    name,
    type,
    quote,
    attack,
    defense,
    weight,
  }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);
    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Product not found');
    }

    const itemExists = await itemsRepository.findByName(name);

    if (itemExists && name !== item.name) {
      throw new AppError('The product already exists');
    }

    item.name = name;
    item.type = type;
    item.quote = quote;
    item.attack = attack;
    item.defense = defense;
    item.weight = weight;

    await itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemService;
