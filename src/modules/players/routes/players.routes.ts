import { celebrate, Joi, Segments, errors } from 'celebrate';
import { Router } from 'express';
import PlayersController from '../controllers/PlayersController';

const playersRouter = Router();
const playersController = new PlayersController();

playersRouter.get('/', playersController.index);
// name, type, quote, attack, defense, weight

playersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  playersController.create,
);

export default playersRouter;
