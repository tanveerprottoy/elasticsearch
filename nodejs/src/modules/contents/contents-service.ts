import { HttpCodes } from "../../utils/constants";
import { ResponseUtils } from "../../utils/response-utils";
import contentsRepository from "./contents-repository";
import express from "express";
import DbUtils from "../../libs/mongodb/db-utils";

class ContentsService {

    create = async (
        data: any
    ): Promise<any> => {
        const result = await contentsRepository.create(data);
        console.log(result);
        console.log(result.insertedId.toString());
        return result.insertedId.toString();
    };

    readMany = async (
        limit: number,
        page: number,
        res: express.Response,
    ): Promise<any> => {
        const cursor = contentsRepository.readMany(limit, page);
        let docs = await DbUtils.streamCursorData(cursor);
        if(!docs) {
            docs = [];
        }
        return ResponseUtils.respond(
            HttpCodes.HTTP_200,
            docs,
            res,
        );
    };

    readOne = async (
        id: string
    ): Promise<any> => {
        return await contentsRepository.readOne(id);
    };

    update = async (
        id: string,
        data: any
    ): Promise<any> => {
        return await contentsRepository.update(id, data);
    };

    delete = async (
        id: string
    ): Promise<any> => {
        return await contentsRepository.delete(id);
    };
}

export default new ContentsService;