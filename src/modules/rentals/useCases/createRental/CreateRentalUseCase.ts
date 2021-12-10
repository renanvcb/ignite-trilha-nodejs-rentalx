import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalHours = 24;

    const userAlreadyRenting =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userAlreadyRenting) {
      throw new AppError("User already has a car rental");
    }

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is not available");
    }

    const dateNow = dayjs().utc().local().format();
    const formattedExpectedReturnDate = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const compare = dayjs(formattedExpectedReturnDate).diff(dateNow, "hours");

    if (compare < minimumRentalHours) {
      throw new AppError("Rentals must have a minimal duration of 24 hours");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
