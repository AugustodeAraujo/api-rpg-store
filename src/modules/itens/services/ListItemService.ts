import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Item';
import { ItemRepository } from '../typeorm/repositories/ItemRepository';

interface IFormatItens {
  id: string;
  name: string;
  info: {
    type: string;
    quote: string;
    weight: number;
  };
  attributes: {
    attack: number;
    defense: number;
  };
}

class ListItemService {
  public async execute(): Promise<IFormatItens[]> {
    const itemsRepository = getCustomRepository(ItemRepository);

    const itens = await itemsRepository.find();
    const formatedItems = itens.map(item => {
      const { id, name, type, quote, attack, defense, weight } = item;
      const formatItem = {
        id,
        name,
        info: {
          type,
          quote,
          weight,
        },
        attributes: {
          attack,
          defense,
        },
      };

      return formatItem;
    });

    return formatedItems;
  }
}

export default ListItemService;
