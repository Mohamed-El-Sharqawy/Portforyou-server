import { Schema, Document } from "mongoose";
import {
  IArikFooter,
  IArikHero,
  IArikProcess,
  IArikService,
  IArikTestimonial,
  IArikTestimonials,
  IArikWorkExperience,
  ITestimonialClient,
} from "../lib/types/template.types";

export interface IArik extends Document {
  hero: IArikHero;
  logos: string[];
  services: IArikService[];
  work: IArikWorkExperience[];
  process: IArikProcess;
  testimonials: IArikTestimonials;
  footer: IArikFooter;
}

const TestimonialClientSchema = new Schema<ITestimonialClient>({
  client_img_url: String,
  client_name: String,
  client_company: String,
});

const ArikTestimonialSchema = new Schema<IArikTestimonial>({
  testimonial_img_url: String,
  testimonial_heading: String,
  testimonial_paragraph: String,
  testimonial_client: TestimonialClientSchema,
});

export const ArikSchema = new Schema<IArik>({
  hero: {
    hero_heading: String,
    hero_paragraph: String,
  },
  logos: [String],
  services: [
    {
      title: String,
      description: String,
    },
  ],
  work: [
    {
      title: String,
      category: String,
      img_url: String,
    },
  ],
  process: {
    process_heading: String,
    process_paragraph: String,
    steps: [
      {
        step_number: Number,
        step_slug: String,
        step_heading: String,
        step_paragraph: String,
        step_points: [String],
      },
    ],
  },
  testimonials: {
    testimonials_heading: String,
    testimonials_paragraph: String,
    testimonials: [ArikTestimonialSchema],
  },
  footer: {
    footer_slug: String,
    footer_heading: String,
    footer_paragraph: String,
  },
});
