import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import { agent as request } from "supertest";
import { GlobalValues } from "../../utils/constants";
import usersService from "./users-service";
import { createServer } from "../../server";
import express from "express";
import { DbClientInstance } from "../../libs/mongodb";

let app: express.Application;

describe("UserTest", () => {
    beforeAll(async () => {
        // start the server
        app = await createServer();
    });
    afterAll(() => {
        DbClientInstance.close();
    });

    describe("user create", () => {
        describe("when passed a valid user an entity is created", () => {
            // api test
            it("should respond with a 201 status code", async () => {
                const response = await request(app).post(`${GlobalValues.API}${GlobalValues.V1}/users`).send({
                    name: "name",
                    address: "address"
                });
                expect(response.statusCode).toBe(201);
            });
        });
    });
    describe("user get", () => {
        describe("when no user is found, should return 404", () => {
            // api test
            it("should respond with a 404 status code", async () => {
                const id = "id";
                const response = await request(app).get(`${GlobalValues.API}${GlobalValues.V1}/users/${id}`);
                expect(response.statusCode).toBe(404);
            });
        });
    });
    // method test
    describe("should return 9", () => {
        test("multiplies 3 * 3 to equal 9", () => {
            expect(usersService.multiply(3, 3)).toBe(9);
        });
    });
});