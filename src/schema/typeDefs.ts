import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    arik: Arik
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

  type ArikHero {
    hero_heading: String
    hero_paragraph: String
  }

  type ArikService {
    title: String
    description: String
  }

  type ArikWorkExperience {
    title: String
    category: String
    img_url: String
  }

  type ArikProcess {
    process_heading: String
    process_paragraph: String
    steps: [ArikProcessStep]
  }

  type ArikProcessStep {
    step_number: Int
    step_slug: String
    step_heading: String
    step_paragraph: String
    step_points: [String]
  }

  type ArikTestimonials {
    testimonials_heading: String
    testimonials_paragraph: String
    testimonials: [ArikTestimonial]
  }

  type ArikTestimonial {
    testimonial_img_url: String
    testimonial_heading: String
    testimonial_paragraph: String
    testimonial_client: TestimonialClient
  }

  type TestimonialClient {
    client_img_url: String
    client_name: String
    client_company: String
  }

  type ArikFooter {
    footer_slug: String
    footer_heading: String
    footer_paragraph: String
  }
`;
