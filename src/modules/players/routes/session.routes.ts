import { celebrate, Joi, Segments, errors } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionRouter = Router();
const sessionController = new SessionController();


sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
