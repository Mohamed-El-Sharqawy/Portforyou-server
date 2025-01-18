import jwt from "jsonwebtoken";
import { UserService } from "../user/user.service";
import { ValidationError } from "../../lib/utils/error.utils";
import { IUser } from "../user/user.model";

export class AuthService {
  private static authService: AuthService;
  private userService: UserService;

  private constructor() {
    this.userService = UserService.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.authService) {
      AuthService.authService = new AuthService();
    }
    return AuthService.authService;
  }

  private generateToken(user: IUser): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );
  }

  async register(
    userData: Partial<IUser>
  ): Promise<{ token: string; user: IUser }> {
    const existingUser = await this.userService.getUserByEmail(userData.email!);
    if (existingUser) {
      throw new ValidationError("Email already exists");
    }

    const user = await this.userService.createUser({
      ...userData,
    });

    const token = this.generateToken(user);
    return { token, user };
  }
}
