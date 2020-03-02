import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';

import CarriageController from './app/controllers/CarriageController';
import CarriageInitController from './app/controllers/CarriageInitController';
import CarriageFinishController from './app/controllers/CarriageFinishController';

import ProblemController from './app/controllers/DeliveryProblemController';

/* import IdentifierController from './app/controllers/IdentifierController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpQuestionController from './app/controllers/HelpQuestionController';
import HelpAnswerController from './app/controllers/HelpAnswerController';
*/
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/*
 * Deliverymen features
 */

// Identify student
// routes.get('/identifiers/:id', IdentifierController.show);

// deliveryman/1/deliveries
routes.get('/deliverymen/:deliveryman_id/deliveries', CarriageController.index);

// status
routes.put('/deliverymen/:delivery_id/delivery-init', CarriageInitController.update);
routes.put('/deliverymen/:delivery_id/delivery-finish', CarriageFinishController.update);

// problems
routes.post('/delivery/:delivery_id/problems', ProblemController.store);
routes.get('/delivery/:delivery_id/problems', ProblemController.show);

// routes.post('/students/:student_id/help-orders', HelpQuestionController.store);
// routes.get('/students/:student_id/help-orders', HelpQuestionController.index);

/*
 * Authenticate user
 */
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

/*
 * User features
 */
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries/:id', DeliveryController.show);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/problem', ProblemController.index);
routes.delete('/problem/:problem_id/cancel-delivery', ProblemController.delete);

/* routes.post('/plans', PlanController.store);
routes.get('/plans/:id', PlanController.show);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations/:id', RegistrationController.show);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.get('/help-orders', HelpAnswerController.index);
routes.post('/help-orders/:id/answer', HelpAnswerController.store);
*/
module.exports = routes;
