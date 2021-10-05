import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUsecase = container.resolve(AuthenticateUserUseCase);

    try {
      const token = await authenticateUserUsecase.execute({
        password,
        email,
      });

      return response.json(token);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { AuthenticateUserController };
