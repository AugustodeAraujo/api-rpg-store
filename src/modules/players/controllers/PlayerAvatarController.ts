import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdatePlayerAvatarService';

export default class PlayerAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();
    const player = await updateAvatar.execute({
      player_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(player);
  }
}
