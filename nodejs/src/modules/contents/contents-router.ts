import express from "express";
import usersController from "./contents-controller";

export function initContentRouter(): express.Router {
    const router = express.Router();
    router.get('/', usersController.readMany);
    router.get('/:id', usersController.readOne);
    router.get('/', usersController.readMany);
    router.get('/', usersController.readMany);
    return router;
}
