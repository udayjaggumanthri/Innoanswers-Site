export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  role: string;
  company: string;
  initials: string;
  avatarSrc?: string;
  placeholder: boolean;
}

export interface TestimonialsContent {
  eyebrow: string;
  headline: string;
  items: TestimonialItem[];
}

export const testimonialsContent: TestimonialsContent = {
  eyebrow: "Testimonials",
  headline: "What our clients say.",
  items: [
    {
      id: "t1",
      quote: "Innoanswers took a messy operational problem and turned it into a working solution: no buzzwords, just a clear plan and steady delivery.",
      authorName: "Elena Vance",
      role: "Head of Operations",
      company: "Aerovance Logistics",
      initials: "EV",
      avatarSrc: "/images/testimonials/elena-vance.jpg",
      placeholder: false,
    },
    {
      id: "t2",
      quote: "They took the time to understand our industry before proposing anything. That made all the difference.",
      authorName: "Marcus Thorne",
      role: "Director of Technology",
      company: "Synthetix Systems",
      initials: "MT",
      avatarSrc: "/images/testimonials/marcus-thorne.jpg",
      placeholder: false,
    },
    {
      id: "t3",
      quote: "The team made complex AI feel manageable, and they stayed with us well past launch.",
      authorName: "Priya Sharma",
      role: "Chief Operating Officer",
      company: "NovaSync Global",
      initials: "PS",
      avatarSrc: "/images/testimonials/priya-sharma.jpg",
      placeholder: false,
    },
  ],
};
