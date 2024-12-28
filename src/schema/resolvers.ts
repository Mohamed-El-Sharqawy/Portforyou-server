import arikService from '../services/arikService.js';

export const resolvers = {
  Query: {
    arik: async () => {
      try {
        const arikData = await arikService.getArikData();
        if (!arikData) {
          // If no data exists, create initial data
          return arikService.createArikData({
            hero: {
              hero_heading: "Hello",
              hero_paragraph: "World",
            },
            logos: ["logo1", "logo2", "logo3", "logo4", "logo5", "logo6"],
            services: [
              { title: "Service 1", description: "Description 1" },
              { title: "Service 2", description: "Description 2" },
              { title: "Service 3", description: "Description 3" },
            ],
            work: [
              {
                title: "Work 1",
                category: "Category 1",
                img_url: "https://via.placeholder.com/150",
              },
              {
                title: "Work 2",
                category: "Category 2",
                img_url: "https://via.placeholder.com/150",
              },
              {
                title: "Work 3",
                category: "Category 3",
                img_url: "https://via.placeholder.com/150",
              },
              {
                title: "Work 4",
                category: "Category 4",
                img_url: "https://via.placeholder.com/150",
              },
            ],
            process: {
              process_heading: "Our Process",
              process_paragraph: "How we work together",
              steps: [
                {
                  step_number: 1,
                  step_slug: "discovery",
                  step_heading: "Discovery",
                  step_paragraph: "Understanding your needs and requirements",
                  step_points: ["Point 1", "Point 2", "Point 3"],
                },
                {
                  step_number: 2,
                  step_slug: "planning",
                  step_heading: "Planning",
                  step_paragraph: "Creating a detailed roadmap",
                  step_points: ["Point 1", "Point 2", "Point 3"],
                },
                {
                  step_number: 3,
                  step_slug: "execution",
                  step_heading: "Execution",
                  step_paragraph: "Bringing ideas to life",
                  step_points: ["Point 1", "Point 2", "Point 3"],
                },
                {
                  step_number: 4,
                  step_slug: "delivery",
                  step_heading: "Delivery",
                  step_paragraph: "Launching and maintaining",
                  step_points: ["Point 1", "Point 2", "Point 3"],
                },
                {
                  step_number: 5,
                  step_slug: "feedback",
                  step_heading: "Feedback",
                  step_paragraph: "Iterating and refining",
                  step_points: ["Point 1", "Point 2", "Point 3"],
                },
              ],
            },
            testimonials: {
              testimonials_heading: "Testimonials",
              testimonials_paragraph: "What our clients say",
              testimonials: [
                {
                  testimonial_img_url: "https://via.placeholder.com/150",
                  testimonial_heading: "Amazing Service",
                  testimonial_paragraph: "They did a fantastic job!",
                  testimonial_client: {
                    client_img_url: "https://via.placeholder.com/150",
                    client_name: "Client 1",
                    client_company: "Company 1",
                  },
                },
                {
                  testimonial_img_url: "https://via.placeholder.com/150",
                  testimonial_heading: "Great Work",
                  testimonial_paragraph: "Exceeded our expectations",
                  testimonial_client: {
                    client_img_url: "https://via.placeholder.com/150",
                    client_name: "Client 2",
                    client_company: "Company 2",
                  },
                },
              ],
            },
            footer: {
              footer_slug: "contact",
              footer_heading: "Let's Work Together",
              footer_paragraph: "Get in touch to start your project",
            },
          });
        }
        return arikData;
      } catch (error) {
        console.error('Error in arik resolver:', error);
        throw error;
      }
    },
  },
};
