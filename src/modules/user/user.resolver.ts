import { UserService } from "./user.service";
import { formatError } from "../../lib/utils/error.utils";
import { GraphQLError } from "graphql";

const userService = UserService.getInstance();

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await userService.getAllUsers();
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
    user: async (_: any, { id }: { id: string }) => {
      try {
        return await userService.getUserById(id);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
    userByEmail: async (_: any, { email }: { email: string }) => {
      try {
        return await userService.getUserByEmail(email);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
  },

  Mutation: {
    updateUser: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        return await userService.updateUser(id, input);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      try {
        return await userService.deleteUser(id);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
    updateUserTemplate: async (
      _: any,
      { id, template }: { id: string; template: any }
    ) => {
      try {
        return await userService.updateUserTemplate(id, template);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
    addSelectedTemplate: async (
      _: any,
      { id, templateName }: { id: string; templateName: string }
    ) => {
      try {
        return await userService.addSelectedTemplate(id, templateName);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
    removeSelectedTemplate: async (
      _: any,
      { id, templateName }: { id: string; templateName: string }
    ) => {
      try {
        return await userService.removeSelectedTemplate(id, templateName);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
  },
};
