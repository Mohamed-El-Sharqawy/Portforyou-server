import { AuthService } from "./auth.service";
import { formatError } from "../../lib/utils/error.utils";
import { GraphQLError } from "graphql";

const authService = AuthService.getInstance();

export const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: { input: any }) => {
      try {
        return await authService.register(input);
      } catch (error) {
        const formattedError = formatError(error);
        throw new GraphQLError(JSON.stringify(formattedError), {
          extensions: { http: formattedError },
        });
      }
    },
  },
};
