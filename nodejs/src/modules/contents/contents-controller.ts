import express from "express";
import contentsService from "./contents-service";

class ContentsController {

    create = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        return await contentsService.create({});
    };

    readMany = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const limit = parseInt(req.query.limit.toString());
        const page = parseInt(req.query.page.toString());
        return await contentsService.readMany(limit, page, res);
    };

    readOne = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const id = req.query.id.toString();
        return await contentsService.readOne(id);
    };

    update = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const id = req.query.id.toString();
        return await contentsService.update(id, {});
    };

    delete = async (
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> => {
        const id = req.query.id.toString();
        return await contentsService.delete(id);
    };
}

export default new ContentsController;