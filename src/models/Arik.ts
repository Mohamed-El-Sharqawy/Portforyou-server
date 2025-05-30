import mongoose, { Schema, Document } from "mongoose";
import {
  IArikFooter,
  IArikHero,
  IArikProcess,
  IArikService,
  IArikTestimonial,
  IArikTestimonials,
  IArikWorkExperience,
  ITestimonialClient,
  IArikLogos,
  IArikProcessStep,
} from "../lib/types/template.types";

export interface IArik extends Document {
  hero: IArikHero;
  logos: IArikLogos[];
  services: IArikService[];
  work: IArikWorkExperience[];
  process: IArikProcess;
  testimonials: IArikTestimonials;
  footer: IArikFooter;
}

const TestimonialClientSchema = new Schema<ITestimonialClient>({
  client_img_id: String,
  client_img_url: String,
  client_name: String,
  client_company: String,
});

const ArikTestimonialSchema = new Schema<IArikTestimonial>({
  testimonial_heading: String,
  testimonial_paragraph: String,
  testimonial_client: TestimonialClientSchema,
});

const ArikProcessStepSchema = new Schema<IArikProcessStep>({
  step_heading: String,
  step_subheading: String,
  step_paragraph: String,
  step_points: [String],
});

export const ArikSchema = new Schema<IArik>({
  hero: {
    hero_heading: String,
    hero_subheading: String,
    hero_paragraph: String,
  },
  logos: {
    type: [
      {
        img_url: String,
        img_id: String,
      },
    ],
    default: Array(6).fill({ img_url: "", img_id: "" }),
  },
  services: {
    type: [
      {
        title: String,
        description: String,
      },
    ],
    default: Array(3).fill({ title: "", description: "" }),
  },
  work: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          auto: true,
        },
        title: String,
        category: String,
        img_url: String,
        img_id: String,
        project_link: String,
      },
    ],
    default: Array(4).fill({
      project_link: "https://www.google.com",
      title: "",
      category: "",
      img_url: "",
      img_id: "",
    }),
  },
  process: {
    process_heading: String,
    process_paragraph: String,
    steps: {
      type: [ArikProcessStepSchema],
      default: Array(5).fill({
        step_heading: "",
        step_subheading: "",
        step_paragraph: "",
        step_points: ["", "", ""],
      }),
    },
  },
  testimonials: {
    testimonials_heading: {
      type: String,
      default: "What my clients say",
    },
    testimonials_paragraph: {
      type: String,
      default:
        "See what my clients have to say about working with me and the results I helped them achieve.",
    },
    testimonials: {
      type: [ArikTestimonialSchema],
      default: Array(6).fill({
        testimonial_heading: "",
        testimonial_paragraph: "",
        testimonial_client: {
          client_name: "",
          client_company: "",
          client_img_url: "",
          client_img_id: "",
        },
      }),
    },
  },
  footer: {
    footer_slug: String,
    footer_heading: String,
    footer_paragraph: String,
  },
});
