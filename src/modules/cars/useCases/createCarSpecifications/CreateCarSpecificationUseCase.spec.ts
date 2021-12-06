import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be albe to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car Name",
      description: "Test Car Description",
      daily_rate: 180,
      license_plate: "TST9999",
      fine_amount: 60,
      brand: "Test Car Brand",
      category_id: "TestCarCategory",
    });

    const specification1 = await specificationsRepositoryInMemory.create({
      name: "Specification Test 1",
      description: "Specification test description 1",
    });

    const specification2 = await specificationsRepositoryInMemory.create({
      name: "Specification Test 2",
      description: "Specification test description 2",
    });

    const specification3 = await specificationsRepositoryInMemory.create({
      name: "Specification Test 3",
      description: "Specification test description 3",
    });

    const specifications_id = [
      specification1.id,
      specification2.id,
      specification3.id,
    ];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBeGreaterThanOrEqual(1);
  });

  it("Should not be albe to add a new specification to a non-existant car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["54321"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
