import { Router } from "express";

import { Specificationsrepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();
const specificationsRepository = new Specificationsrepository();

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

// Need refactoring
specificationsRoutes.get("/", (request, response) => {
    const allSpecifications = specificationsRepository.list();

    return response.json(allSpecifications);
});

export { specificationsRoutes };
