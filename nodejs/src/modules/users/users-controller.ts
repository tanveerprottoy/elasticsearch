import express from "express";
import usersService from "./users-service";

class UsersController {

    create = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        return await usersService.create({});
    };

    readMany = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const limit = parseInt(req.query.limit.toString());
        const page = parseInt(req.query.page.toString());
        return await usersService.readMany(limit, page, res);
    };

    readOne = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const id = req.query.id.toString();
        return await usersService.readOne(id);
    };

    update = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const id = req.query.id.toString();
        return await usersService.update(id, {});
    };

    delete = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const id = req.query.id.toString();
        return await usersService.delete(id);
    };
}

export default new UsersController;