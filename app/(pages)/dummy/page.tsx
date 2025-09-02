import React, { ReactNode } from "react";

/* -------------------- Reusable Typography -------------------- */

type TextProps = { children: ReactNode; className?: string };

export const Heading: React.FC<TextProps> = ({ children, className }) => (
  <h1
    className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black pb-2 md:pb-4 ${className || ""}`}
  >
    {children}
  </h1>
);

export const SubHeading: React.FC<TextProps> = ({ children, className }) => (
  <h2
    className={`text-base sm:text-lg md:text-xl font-medium text-black pb-2 md:pb-4 ${className || ""}`}
  >
    {children}
  </h2>
);

export const Paragraph: React.FC<TextProps> = ({ children, className }) => (
  <p className={`text-sm sm:text-base text-gray-800 ${className || ""}`}>
    {children}
  </p>
);

/* -------------------- Button -------------------- */

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${className || ""}`}
  >
    {children}
  </button>
);

/* -------------------- Hero Section -------------------- */

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 items-center gap-8 sm:gap-10 md:gap-12">
          {/* Left: Copy */}
          <div>
            <Heading>Build fast. Scale everywhere.</Heading>
            <SubHeading>One design system for every device</SubHeading>

            <Paragraph className="max-w-xl">
              Ship beautiful, accessible interfaces with consistent typography
              and button sizing. This hero uses responsive spacing, readable
              line-lengths, and sensible defaults out of the box.
            </Paragraph>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button>Get Started</Button>
              <Button>Learn More</Button>
            </div>
          </div>

          {/* Right: Media */}
          <div className="order-first lg:order-none">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop"
              alt="Product preview"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-xl shadow"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
