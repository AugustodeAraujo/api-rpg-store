import AppError from '@shared/errors/Error';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Player from '../typeorm/entities/Player';
import { PlayersRepository } from '../typeorm/repositories/PlayersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}



class CreatePlayerService {
  public async execute({ name, password, email }: IRequest): Promise<Player> {
    console.log('create player')
    const playersRepository = getCustomRepository(PlayersRepository);
    const emailExists = await playersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already exists.');
    }

    const hashedPassword = await hash(password, 8)

    const player = playersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await playersRepository.save(player);
    return player;
  }
}

export default CreatePlayerService;
