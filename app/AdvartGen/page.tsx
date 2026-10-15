import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImagePlus, SlidersHorizontal, ShieldCheck } from "lucide-react";
import AdvartGen from "@/components/hero/advart-gen";

export const metadata: Metadata = {
  title: "Advart Gen | AI Product Photography",
  description: "Turn existing product photos into ecommerce, model and lifestyle imagery with Advart Gen's managed AI image production.",
  alternates: { canonical: "/AdvartGen", languages: { "en-IN": "/AdvartGen" } },
  openGraph: {
    title: "Advart Gen | AI Product Photography",
    description: "Product imagery for your next catalogue, collection or campaign.",
    url: "/AdvartGen",
  },
};

const steps = [
  { icon: ImagePlus, title: "Start with your product", description: "Share clear product photos and close-ups of the details that matter, from fabric and colour to prints and finishing." },
  { icon: SlidersHorizontal, title: "Choose your direction", description: "Tell us the style, setting and formats you need. Share references for your catalogue, model images or next campaign." },
  { icon: ShieldCheck, title: "We produce and review", description: "Our team handles generation, refinement and quality checks, then delivers images for your brand to review and use." },
];

const faqs = [
  { question: "Do I need professional product photos?", answer: "Clear existing product photos are often enough to start. For products with intricate details, additional angles and close-ups help us preserve the appearance of your product." },
  { question: "Do I need to write AI prompts?", answer: "No. Share your product images, references and a simple brief. Advart Gen manages visual direction, image production, refinement and review for you." },
  { question: "What types of images can you create?", answer: "Catalogue images, model photography, ghost mannequin and flatlay images, lifestyle scenes, campaign visuals, product details and new backgrounds. The right approach depends on your product and brief." },
  { question: "Can you work with a full catalogue?", answer: "Yes. The workflow supports individual products and larger catalogues. Share your product count, image requirements and timeline so the team can plan production." },
];

export default function AdvartGenPage() {
  return (
    <div className="pt-24 text-black">
      <AdvartGen dedicated />
      <section id="how-it-works" aria-labelledby="gen-workflow-heading" className="scroll-mt-24 bg-white">
        <div className="section-container">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-black/50">A simpler production process</p>
          <h2 id="gen-workflow-heading" className="text-3xl font-normal tracking-tight sm:text-4xl">You bring the product.<br /><span className="font-semibold">We handle the production.</span></h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="border-t border-black/15 pt-6">
                <div className="mb-6 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffdc38]"><Icon aria-hidden="true" className="h-6 w-6" /></span><span className="text-sm text-black/40">0{index + 1}</span></div>
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-3 leading-relaxed text-black/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="gen-pricing-heading" className="section-container">
        <div className="grid gap-8 rounded-2xl bg-[#ffdc38] p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="mb-3 text-sm font-medium">Built for your next collection</p><h2 id="gen-pricing-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">More possibilities.<br />A simpler starting point.</h2><p className="mt-4 max-w-lg text-black/70">Start with a few products or plan your full catalogue. Let’s find the right visual direction for your brand.</p></div>
          <div className="md:max-w-[260px]"><p className="text-sm">Images starting from</p><p className="mt-1 text-5xl font-semibold">₹50<span className="text-base font-normal"> / image</span></p><p className="mt-3 text-xs leading-relaxed text-black/65">Final pricing depends on garment complexity and the number of iterations. Confirm your requirements with our team.</p><Link href="/contactus" className="btn-primary mt-6">Discuss your products<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
        </div>
      </section>
      <section aria-labelledby="gen-faq-heading" className="bg-white">
        <div className="section-container grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div><p className="mb-3 text-sm uppercase tracking-[0.16em] text-black/50">Good to know</p><h2 id="gen-faq-heading" className="text-3xl font-normal sm:text-4xl">Before you<br /><span className="font-semibold">get started.</span></h2></div>
          <div>{faqs.map(({ question, answer }) => <details key={question} className="group border-b border-black/15 py-5"><summary className="cursor-pointer text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p className="mt-4 pr-4 leading-relaxed text-black/65">{answer}</p></details>)}</div>
        </div>
      </section>
    </div>
  );
}
