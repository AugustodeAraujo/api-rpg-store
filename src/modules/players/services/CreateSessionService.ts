import AppError from '@shared/errors/Error';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { getCustomRepository } from 'typeorm';
import Player from '../typeorm/entities/Player';
import { PlayersRepository } from '../typeorm/repositories/PlayersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  player: Player;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const playersRepository = getCustomRepository(PlayersRepository);
    const player = await playersRepository.findByEmail(email);

    if (!player) {
      throw new AppError('Player not found', 401);
    }

    const validatePassword = await compare(password, player.password);

    if (!validatePassword) {
      throw new AppError('Password incorrect', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: player.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      player,
      token,
    };
  }
}

export default CreateSessionService;
