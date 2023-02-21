import { EntityRepository, Repository } from 'typeorm';
import Player from '../entities/Player';

@EntityRepository(Player)
export class PlayersRepository extends Repository<Player> {
  public async findByName(name: string): Promise<Player | undefined> {
    const player = await this.findOne({
      where: {
        name: name,
      },
    });
    return player;
  }

  public async findById(id: string): Promise<Player | undefined> {
    const player = await this.findOne({
      where: {
        id
      },
    });
    return player;
  }

  public async findByEmail(email: string): Promise<Player | undefined> {
    const player = await this.findOne({
      where: {
        email
      },
    });
    return player;
  }
}
