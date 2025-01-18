import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  enum SubscriptionType {
    REGULAR
    PREMIUM
    VIP
  }

  type TestimonialClient {
    client_img_url: String
    client_name: String
    client_company: String
  }

  type ArikTestimonial {
    testimonial_img_url: String
    testimonial_heading: String
    testimonial_paragraph: String
    testimonial_client: TestimonialClient
  }

  type ArikProcessStep {
    step_number: Int
    step_slug: String
    step_heading: String
    step_paragraph: String
    step_points: [String]
  }

  type ArikProcess {
    process_heading: String
    process_paragraph: String
    steps: [ArikProcessStep]
  }

  type ArikService {
    title: String
    description: String
  }

  type ArikHero {
    hero_heading: String
    hero_paragraph: String
  }

  type ArikTestimonials {
    testimonials_heading: String
    testimonials_paragraph: String
    testimonials: [ArikTestimonial]
  }

  type ArikFooter {
    footer_slug: String
    footer_heading: String
    footer_paragraph: String
  }

  type Arik {
    hero: ArikHero
    logos: [String]
    services: [ArikService]
    work: [ArikWorkExperience]
    process: ArikProcess
    testimonials: ArikTestimonials
    footer: ArikFooter
  }

  type ArikWorkExperience {
    title: String
    category: String
    img_url: String
  }

  type User {
    id: ID!
    email: String!
    username: String!
    subscription: SubscriptionType!
    createdAt: String!
    updatedAt: String!
    clerkId: String!
    arikTemplate: Arik
    selectedTemplates: [String]
  }

  input TestimonialClientInput {
    client_img_url: String
    client_name: String
    client_company: String
  }

  input ArikTestimonialInput {
    testimonial_img_url: String
    testimonial_heading: String
    testimonial_paragraph: String
    testimonial_client: TestimonialClientInput
  }

  input ArikProcessStepInput {
    step_number: Int
    step_slug: String
    step_heading: String
    step_paragraph: String
    step_points: [String]
  }

  input ArikProcessInput {
    process_heading: String
    process_paragraph: String
    steps: [ArikProcessStepInput]
  }

  input ArikServiceInput {
    title: String
    description: String
  }

  input ArikHeroInput {
    hero_heading: String
    hero_paragraph: String
  }

  input ArikTestimonialsInput {
    testimonials_heading: String
    testimonials_paragraph: String
    testimonials: [ArikTestimonialInput]
  }

  input ArikFooterInput {
    footer_slug: String
    footer_heading: String
    footer_paragraph: String
  }

  input ArikInput {
    hero: ArikHeroInput
    logos: [String]
    services: [ArikServiceInput]
    work: [ArikWorkExperienceInput]
    process: ArikProcessInput
    testimonials: ArikTestimonialsInput
    footer: ArikFooterInput
  }

  input ArikWorkExperienceInput {
    title: String
    category: String
    img_url: String
  }

  input UpdateUserInput {
    email: String
    username: String
    subscription: SubscriptionType
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
  }

  type Mutation {
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUserTemplate(id: ID!, template: ArikInput!): User
    addSelectedTemplate(id: ID!, templateName: String!): User
    removeSelectedTemplate(id: ID!, templateName: String!): User
  }
`;
