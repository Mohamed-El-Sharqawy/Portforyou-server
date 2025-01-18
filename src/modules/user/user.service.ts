import logger from "../../lib/utils/logger";
import User from "./user.model";
import { IUser } from "./user.model";
import { createDotNotationUpdate } from "../../lib/utils/object.utils";
import { IArikTemplate } from "../../lib/types/template.types";
import { handleMongoError } from "../../lib/utils/error.utils";

export class UserService {
  private static userService: UserService;

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.userService) {
      UserService.userService = new UserService();
    }
    return UserService.userService;
  }

  async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase() });
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = new User({
        ...userData,
        email: userData.email?.toLowerCase(),
      });

      return await user.save();
    } catch (error: any) {
      throw handleMongoError(error);
    }
  }

  async updateUser(
    id: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      return User.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true, runValidators: true }
      );
    } catch (error) {
      logger.error("Error updating user:", { error, userId: id });
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await User.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      logger.error("Error deleting user:", { error, userId: id });
      throw error;
    }
  }

  async updateUserTemplate(
    id: string,
    template: Partial<IArikTemplate>
  ): Promise<IUser | null> {
    try {
      // Create update object with dot notation, handling nested objects
      const updateObj = createDotNotationUpdate("arikTemplate", template);

      // Only proceed if there are actual updates
      if (Object.keys(updateObj).length === 0) {
        return User.findById(id);
      }

      return User.findByIdAndUpdate(
        id,
        { $set: updateObj },
        { new: true, runValidators: true }
      );
    } catch (error) {
      logger.error("Error updating user template:", { error, userId: id });
      throw error;
    }
  }

  async addSelectedTemplate(
    id: string,
    templateName: string
  ): Promise<IUser | null> {
    try {
      return User.findByIdAndUpdate(
        id,
        { $addToSet: { selectedTemplates: templateName } },
        { new: true, runValidators: true }
      );
    } catch (error) {
      logger.error("Error adding selected template:", {
        error,
        userId: id,
        templateName,
      });
      throw error;
    }
  }

  async removeSelectedTemplate(
    id: string,
    templateName: string
  ): Promise<IUser | null> {
    try {
      return User.findByIdAndUpdate(
        id,
        { $pull: { selectedTemplates: templateName } },
        { new: true, runValidators: true }
      );
    } catch (error) {
      logger.error("Error removing selected template:", {
        error,
        userId: id,
        templateName,
      });
      throw error;
    }
  }
}
