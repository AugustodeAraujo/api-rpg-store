import { celebrate, Joi, Segments, errors } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload'
import { Router } from 'express';
import PlayersController from '../controllers/PlayersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import PlayerAvatarController from '../controllers/PlayerAvatarController';


const playersRouter = Router();
const playersController = new PlayersController();
const playersAvatarController = new PlayerAvatarController();
const upload = multer(uploadConfig)

playersRouter.get('/', isAuthenticated, playersController.index);
playersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), playersAvatarController.update )

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
