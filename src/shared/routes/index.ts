import { Router } from 'express';
import itensRouter from '@modules/itens/routes/itens.routes';
import playersRouter from '@modules/players/routes/players.routes';
import sessionRouter from '@modules/players/routes/session.routes';

const routes = Router();

routes.use('/itens', itensRouter);
routes.use('/players', playersRouter);
routes.use('/session', sessionRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'HelloWorld' });
});

export default routes;
