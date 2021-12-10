import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRenatalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create a car rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRenatalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new car rental", async () => {
    const rental = await createRenatalUseCase.execute({
      user_id: "1234",
      car_id: "4321",
      expected_return_date: new Date(),
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new car rental to an user with an active rental", async () => {
    expect(async () => {
      await createRenatalUseCase.execute({
        user_id: "test_user_id",
        car_id: "any_car_id",
        expected_return_date: new Date(),
      });

      await createRenatalUseCase.execute({
        user_id: "test_user_id",
        car_id: "any_car_id",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new car rental to a car already rented", async () => {
    expect(async () => {
      await createRenatalUseCase.execute({
        user_id: "any_user_id",
        car_id: "test_car_id",
        expected_return_date: new Date(),
      });

      await createRenatalUseCase.execute({
        user_id: "any_user_id",
        car_id: "test_car_id",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
