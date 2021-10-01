import { Specification } from "../../entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class Specificationsrepository implements ISpecificationsRepository {
    private specifications: Specification[];

    // Singleton Pattern begins
    private static INSTANCE: Specificationsrepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): Specificationsrepository {
        if (!Specificationsrepository.INSTANCE) {
            Specificationsrepository.INSTANCE = new Specificationsrepository();
        }

        return Specificationsrepository.INSTANCE;
    }
    // Singleton Pattern ends

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name
        );
        return specification;
    }

    list(): Specification[] {
        return this.specifications;
    }
}

export { Specificationsrepository };
