import { Router } from "express";

import { Specificationsrepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new Specificationsrepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(
        specificationsRepository
    );

    createSpecificationService.execute({ name, description });

    return response.status(201).send();
});

specificationsRoutes.get("/", (request, response) => {
    const allSpecifications = specificationsRepository.list();

    return response.json(allSpecifications);
});

export { specificationsRoutes };
