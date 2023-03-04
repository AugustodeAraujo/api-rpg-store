import AppError from '@shared/errors/Error';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Player from '../typeorm/entities/Player';
import { PlayersRepository } from '../typeorm/repositories/PlayersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  player_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ player_id, avatarFilename }: IRequest): Promise<Player> {
    const playersRepository = getCustomRepository(PlayersRepository);

    const player = await playersRepository.findById(player_id);

    if (!player) {
      throw new AppError('Player not found');
    }

    if (player.avatar) {
      const playerAvatarFilePath = path.join(
        uploadConfig.directory,
        player.avatar,
      );
      const playerAvatarFileExists = await fs.promises.stat(
        playerAvatarFilePath,
      );

      if(playerAvatarFileExists){
        await fs.promises.unlink(playerAvatarFilePath)
      }
    }

    player.avatar = avatarFilename;

    await playersRepository.save(player);

    console.log(player)

    return player

  }
}

export default UpdateUserAvatarService;
