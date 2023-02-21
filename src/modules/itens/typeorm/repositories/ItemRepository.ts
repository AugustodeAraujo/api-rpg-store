import { EntityRepository, Repository } from 'typeorm';
import Item from '../entities/Item';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  public async findByName(name: string): Promise<Item | undefined> {
    const item = this.findOne({
      where: {
        name: name,
      },
    });
    return item;
  }
}
