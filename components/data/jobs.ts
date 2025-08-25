export type Job = {
  slug: string
  title: string
  location: string
  type: string
  description: string
}

export const jobs: Job[] = [
  {
    slug: "senior-digital-marketing-specialist",
    title: "Senior Digital Marketing Specialist",
    location: "Remote / Innovation City",
    type: "Full-time",
    description:
      "Lead digital campaigns, analyze performance, and drive client growth.",
  },
  {
    slug: "performance-marketing-manager",
    title: "Performance Marketing Manager",
    location: "Innovation City",
    type: "Full-time",
    description:
      "Develop and execute data-driven performance marketing strategies.",
  },
  {
    slug: "brand-strategist",
    title: "Brand Strategist",
    location: "Remote",
    type: "Full-time",
    description:
      "Shape brand identities and develop compelling brand narratives for clients.",
  },
  {
    slug: "junior-seo-analyst",
    title: "Junior SEO Analyst",
    location: "Innovation City",
    type: "Full-time",
    description:
      "Assist in SEO strategy implementation and keyword research.",
  },
  {
    slug: "content-creator",
    title: "Content Creator",
    location: "Remote",
    type: "Full-time",
    description:
      "Produce engaging content for various digital platforms.",
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Innovation City",
    type: "Full-time",
    description:
      "Design intuitive and visually appealing user interfaces.",
  },
]
