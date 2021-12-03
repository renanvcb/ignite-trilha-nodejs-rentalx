import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car Name",
      description: "Test Car Description",
      daily_rate: 180,
      license_plate: "TST9999",
      fine_amount: 60,
      brand: "Test Car Brand",
      category_id: "TestCarCategory",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Test Car Description",
        daily_rate: 180,
        license_plate: "TST9999",
        fine_amount: 60,
        brand: "Test Car Brand",
        category_id: "TestCarCategory",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Test Car Description",
        daily_rate: 180,
        license_plate: "TST9999",
        fine_amount: 60,
        brand: "Test Car Brand",
        category_id: "TestCarCategory",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a car available for rent", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Test",
      description: "Test Car Description",
      daily_rate: 180,
      license_plate: "TST1234",
      fine_amount: 60,
      brand: "Test Car Brand",
      category_id: "TestCarCategory",
    });

    expect(car.available).toBe(true);
  });
});
