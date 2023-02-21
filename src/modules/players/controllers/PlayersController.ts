import { Request, Response } from 'express';
import CreatePlayerService from '../services/CreatePlayerService';
import ListPlayerService from '../services/ListPlayerService';

export default class PlayersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPlayers = new ListPlayerService();
    const players = await listPlayers.execute();
    return response.json(players);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;
    const createPlayer = new CreatePlayerService();
    const player = await createPlayer.execute({ name, password, email });
    return response.json(player);
  }
}
