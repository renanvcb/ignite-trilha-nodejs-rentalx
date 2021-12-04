import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUsecase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUsecase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "First car",
      daily_rate: 180,
      license_plate: "TST1111",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "TestCarCategory1",
    });

    const cars = await listAvailableCarsUsecase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Second car",
      daily_rate: 200,
      license_plate: "TST2222",
      fine_amount: 70,
      brand: "Brand 2",
      category_id: "TestCarCategory2",
    });

    const cars = await listAvailableCarsUsecase.execute({
      category_id: "TestCarssssCategory",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Third car",
      daily_rate: 130,
      license_plate: "TST3333",
      fine_amount: 50,
      brand: "Brand 3",
      category_id: "TestCarCategory3",
    });

    const cars = await listAvailableCarsUsecase.execute({
      brand: "Brand 3",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by car name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Fourth car",
      daily_rate: 250,
      license_plate: "TST4444",
      fine_amount: 100,
      brand: "Brand 4",
      category_id: "TestCarCategory4",
    });

    const cars = await listAvailableCarsUsecase.execute({
      name: "Car 4",
    });

    // console.log(cars);
    expect(cars).toEqual([car]);
  });
});
