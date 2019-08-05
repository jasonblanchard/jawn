import { Application } from 'express';
import LoggerService from 'app/services/LoggerService';

export interface Registry {
    logger: LoggerService
    server: Application
}
