import express, { Express } from "express";
import { Server } from "http";
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeprion.filter';
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { ILogger } from "./logger/logger.interface";
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
    }

    public useRouters() {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter)); 
    }

    public async init() {
        this.useRouters();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);

        this.logger.log('server run');
    }
}