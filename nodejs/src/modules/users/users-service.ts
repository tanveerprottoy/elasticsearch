import { GlobalValues, HttpCodes } from "../../utils/constants";
import { ResponseUtils } from "../../utils/response-utils";
import usersRepository from "./users-repository";
import express from "express";
import DbUtils from "../../libs/mongodb/db-utils";

class UsersService {

    create = async (
        data: any
    ): Promise<any> => {
        const result = await usersRepository.create(data);
        console.log(result);
        console.log(result.insertedId.toString());
        return result.insertedId.toString();
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

    readOne = async (
        id: string,
        res: express.Response
    ): Promise<any> => {
        const data = await usersRepository.readOne(id);
        if(!data) {
            return ResponseUtils.respond(
                HttpCodes.HTTP_404,
                {
                    message: GlobalValues.NOT_FOUND
                },
                res,
            );
        }
        return ResponseUtils.respond(
            HttpCodes.HTTP_200,
            data,
            res,
        );
    };

    update = async (
        id: string,
        data: any
    ): Promise<any> => {
        return await usersRepository.update(id, data);
    };

    delete = async (
        id: string
    ): Promise<any> => {
        return await usersRepository.delete(id);
    };

    multiply(x: number, y: number): number {
        return x * y;
    }
}

export default new UsersService;