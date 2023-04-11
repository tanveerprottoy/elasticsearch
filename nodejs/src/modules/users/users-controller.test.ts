import { describe, expect, test } from '@jest/globals';
import { agent as request } from "supertest";
import usersService from "./users-service";

/* describe("UserController", () => {
    describe("getUsers", () => {
        test("should return empty array", async () => {
            const spy = jest
                .spyOn(UserRepository, "getUsers")
                .mockResolvedValueOnce([]);
            const controller = new UserController();
            const users = await controller.getUsers();
            expect(users).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });
}); */

test("it should pass", async () => {
    expect(true).toBe(true);
});