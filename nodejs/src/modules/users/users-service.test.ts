import { afterAll, beforeAll, describe, expect, test, it, jest } from '@jest/globals';
import usersService from "./users-service";
import { createServer } from "../../server";
import express from "express";
import { DbClientInstance } from "../../libs/mongodb";

let app: express.Application;

describe("UserService", () => {
    beforeAll(async () => {
        // start the server
        app = await createServer();
    });
    afterAll(() => {
        DbClientInstance.close();
    });
    // method test
    describe("should return 9", () => {
        test("multiplies 3 * 3 to equal 9", () => {
            expect(usersService.multiply(3, 3)).toBe(9);
        });
    });
    // mock test
    describe("mock test", async () => {
        it("should return user", () => {
            const req: any = {
                get: jest.fn((name) => {
                    if(name === 'content-type') return 'text/plain';
                })
            };
            const res: any = {
                send: jest.fn()
            }
            const expectedResponse: Partial<express.Response> = {};
            expect(usersService.readOne("id", res)).toBe(expectedResponse);
        });
    });
});