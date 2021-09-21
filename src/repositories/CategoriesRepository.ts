import { Category } from "../model/category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

    // Inicializando o array
    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }
}

export { CategoriesRepository };
