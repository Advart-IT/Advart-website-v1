import Image from "next/image"

export function TechnologiesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-8 text-center">
        <h2 className="text-xl font-semibold">Works with your technologies</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <Image
            src="/placeholder.svg?height=48&width=48"
            width={48}
            height={48}
            alt="React Logo"
            className="h-12 w-12 object-contain"
          />
          <Image
            src="/placeholder.svg?height=48&width=48"
            width={48}
            height={48}
            alt="Svelte Logo"
            className="h-12 w-12 object-contain"
          />
          <Image
            src="/placeholder.svg?height=48&width=48"
            width={48}
            height={48}
            alt="Vue Logo"
            className="h-12 w-12 object-contain"
          />
          <Image
            src="/placeholder.svg?height=48&width=48"
            width={48}
            height={48}
            alt="Tailwind CSS Logo"
            className="h-12 w-12 object-contain"
          />
          <Image
            src="/placeholder.svg?height=48&width=48"
            width={48}
            height={48}
            alt="Next.js Logo"
            className="h-12 w-12 object-contain"
          />
          <Image
            src="/placeholder.svg?height=48&width=48"
            width={48}
            height={48}
            alt="Astro Logo"
            className="h-12 w-12 object-contain"
          />
        </div>
      </div>
    </section>
  )
}
