import { celebrate, Joi, Segments, errors } from 'celebrate';
import { Router } from 'express';
import ItensController from '../controllers/ItensController';

const itensRouter = Router();
const itensController = new ItensController();

itensRouter.get('/', itensController.index);
// name, type, quote, attack, defense, weight
itensRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  itensController.show,
);

itensRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      quote: Joi.string().allow('').optional(), 
      attack: Joi.number().required(),
      defense: Joi.number().required(),
      weight: Joi.number().required(),
    },
  }),
  itensController.create,
);

itensRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      quote: Joi.string(),
      attack: Joi.number().required(),
      defense: Joi.number().required(),
      weight: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  itensController.update,
);

itensRouter.delete(
  '/:id',

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  itensController.delete,
);

export default itensRouter;
