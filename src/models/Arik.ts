import mongoose, { Schema, Document } from 'mongoose';

interface IArikHero {
  hero_heading: string;
  hero_paragraph: string;
}

interface IArikService {
  title: string;
  description: string;
}

interface IArikWorkExperience {
  title: string;
  category: string;
  img_url: string;
}

interface IArikProcessStep {
  step_number: number;
  step_slug: string;
  step_heading: string;
  step_paragraph: string;
  step_points: string[];
}

interface IArikProcess {
  process_heading: string;
  process_paragraph: string;
  steps: IArikProcessStep[];
}

interface ITestimonialClient {
  client_img_url: string;
  client_name: string;
  client_company: string;
}

interface IArikTestimonial {
  testimonial_img_url: string;
  testimonial_heading: string;
  testimonial_paragraph: string;
  testimonial_client: ITestimonialClient;
}

interface IArikTestimonials {
  testimonials_heading: string;
  testimonials_paragraph: string;
  testimonials: IArikTestimonial[];
}

interface IArikFooter {
  footer_slug: string;
  footer_heading: string;
  footer_paragraph: string;
}

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

const ArikSchema = new Schema<IArik>({
  hero: {
    hero_heading: String,
    hero_paragraph: String,
  },
  logos: [String],
  services: [{
    title: String,
    description: String,
  }],
  work: [{
    title: String,
    category: String,
    img_url: String,
  }],
  process: {
    process_heading: String,
    process_paragraph: String,
    steps: [{
      step_number: Number,
      step_slug: String,
      step_heading: String,
      step_paragraph: String,
      step_points: [String],
    }],
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

export default mongoose.model<IArik>('Arik', ArikSchema);
