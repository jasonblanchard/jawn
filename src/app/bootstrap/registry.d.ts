import { IContainer } from 'bottlejs';
import UserService from 'app/services/UserService';
import GraphqlService from 'app/services/GraphqlService';
import LoggerService, { LogLevelDesc } from 'app/services/LoggerService';
import LoginController from 'app/controllers/LoginController';

export interface Registry extends IContainer {
    userService: UserService
    graphqlService: GraphqlService
    logger: LoggerService
    loginController: LoginController
}
