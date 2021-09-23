import { Specificationsrepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUsecase";

const listSpecificationsRepository = Specificationsrepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
    listSpecificationsRepository
);
const listSpecificationsController = new ListSpecificationsController(
    listSpecificationsUseCase
);

export { listSpecificationsController };
