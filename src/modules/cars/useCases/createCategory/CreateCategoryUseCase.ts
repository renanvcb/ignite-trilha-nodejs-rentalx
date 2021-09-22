import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}
    execute({ name, description }: IRequest): void {
        // Checking if given category name already exists
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }
        // End of check

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
