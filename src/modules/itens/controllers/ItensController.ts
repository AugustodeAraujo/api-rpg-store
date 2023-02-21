import { Request, Response } from 'express';
import CreateItemService from '../services/CreateItemService';
import DeleteItemService from '../services/DeleteItemService';
import ListItemService from '../services/ListItemService';
import ShowItemService from '../services/ShowItemService';
import UpdateItemService from '../services/UpdateItemService';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listItens = new ListItemService();
    const itens = await listItens.execute();
    return response.json(itens);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showItens = new ShowItemService();
    const itens = await showItens.execute({ id });
    return response.json(itens);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {name, type, quote, attack, defense, weight } = request.body;
    const createItem = new CreateItemService();
    const item = await createItem.execute({ name, type, quote, attack, defense, weight  });
    return response.json(item);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, type, quote, attack, defense, weight  } = request.body;
    const updateItem = new UpdateItemService();
    const item = await updateItem.execute({ id, name, type, quote, attack, defense, weight  });
    return response.json(item);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteItem = new DeleteItemService();
    await deleteItem.execute({ id });

    return response.json({ message: 'Deleted item.' });
  }
}
