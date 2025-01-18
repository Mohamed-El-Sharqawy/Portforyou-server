import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type AuthResponse {
    token: String!
    user: User!
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
  }

  input RegisterInput {
    clerkId: String!
    email: String!
    username: String
  }
`;
