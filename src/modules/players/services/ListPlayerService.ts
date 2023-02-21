import AppError from '@shared/errors/Error';
import { getCustomRepository } from 'typeorm';
import Player from '../typeorm/entities/Player';
import { PlayersRepository } from '../typeorm/repositories/PlayersRepository';

class ListPlayerService {
  public async execute(): Promise<Player[]> {
    const playersRepository = getCustomRepository(PlayersRepository);
    const players = playersRepository.find();

    return players;
  }
}

export default ListPlayerService;
