import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRenatalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a car rental", () => {
  const addTwentyFourHoursFromNow = dayjs().add(1, "day").toDate();
  const expected_return_date = addTwentyFourHoursFromNow;
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRenatalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("Should be able to create a new car rental", async () => {
    const rental = await createRenatalUseCase.execute({
      user_id: "1234",
      car_id: "4321",
      expected_return_date,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new car rental to an user with an active rental", async () => {
    expect(async () => {
      await createRenatalUseCase.execute({
        user_id: "test_user_id",
        car_id: "any_car_id",
        expected_return_date,
      });

      await createRenatalUseCase.execute({
        user_id: "test_user_id",
        car_id: "any_car_id",
        expected_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new car rental to a car already rented", async () => {
    expect(async () => {
      await createRenatalUseCase.execute({
        user_id: "any_user_id",
        car_id: "test_car_id",
        expected_return_date,
      });

      await createRenatalUseCase.execute({
        user_id: "any_user_id",
        car_id: "test_car_id",
        expected_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new car rental with return in less than 24 hours", async () => {
    expect(async () => {
      await createRenatalUseCase.execute({
        user_id: "any_user_id",
        car_id: "any_car_id",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
