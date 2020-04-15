import { Router } from 'express';

import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';

import CarriageController from './app/controllers/CarriageController';
import CarriageInitController from './app/controllers/CarriageInitController';
import CarriageFinishController from './app/controllers/CarriageFinishController';

import ProblemController from './app/controllers/DeliveryProblemController';

import IdentifierController from './app/controllers/IdentifierController';

import authMiddleware from './app/middlewares/auth';

import uploadConfig from './config/upload';

const upload = multer(uploadConfig);

const routes = new Router();

/*
 * Deliverymen features
 */

// Identify student
routes.get('/identifiers/:id', IdentifierController.show);

// deliveryman/1/deliveries
routes.get('/deliverymen/:deliveryman_id/deliveries', CarriageController.index);

// status
routes.put('/deliverymen/:delivery_id/delivery-init', CarriageInitController.update);
routes.put('/deliverymen/:delivery_id/delivery-finish', upload.single('file'), CarriageFinishController.update);

// problems
routes.post('/delivery/:delivery_id/problems', ProblemController.store);
routes.get('/delivery/:delivery_id/problems', ProblemController.show);

/*
 * Authenticate user (admin)
 */
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

/*
 * Admin features
 */
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/deliverymen', upload.single('file'), DeliverymanController.store);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', upload.single('file'), DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries/:id', DeliveryController.show);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/problem', ProblemController.index);
routes.delete('/problem/:problem_id/cancel-delivery', ProblemController.delete);

module.exports = routes;
