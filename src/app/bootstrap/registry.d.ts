import { MongoStore } from 'app/services/MongoService';
import { Application } from 'express';
import UserService from 'app/services/UserService';
import GraphqlService from 'app/services/GraphqlService';
import LoggerService, { LogLevelDesc } from 'app/services/LoggerService';
import LoginController from 'app/controllers/LoginController';

export interface Registry {
    userService: UserService
    graphqlService: GraphqlService
    logger: LoggerService
    loginController: LoginController
    store: MongoStore
    server: Application
}
