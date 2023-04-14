import express from "express";
import usersRepository from "./users-repository";
import elasticsearchService from "../elasticsearch/elasticsearch-service";
import { ResponseUtils } from "../../utils/response-utils";
import { HttpCodes } from "../../utils/constants";
import DbUtils from "../../libs/mongodb/db-utils";

class UsersService {

    create = async (
        data: any,
        res: express.Response,
    ): Promise<any> => {
        const result = await usersRepository.create(data);
        console.log(result);
        console.log(result.insertedId.toString());
        const result1 = await elasticsearchService.create(data);
        return ResponseUtils.respond(
            HttpCodes.HTTP_201,
            ResponseUtils.buildData(result.insertedId.toString()),
            res
        );
    };

    readMany = async (
        limit: number,
        page: number,
        res: express.Response,
    ): Promise<any> => {
        const cursor = usersRepository.readMany(limit, page);
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

    search = async (
        search: string,
        res: express.Response,
    ): Promise<any> => {
        return ResponseUtils.respond(
            HttpCodes.HTTP_200,
            ResponseUtils.buildData(await elasticsearchService.search(search)),
            res
        );
    };
}

export default new UsersService;