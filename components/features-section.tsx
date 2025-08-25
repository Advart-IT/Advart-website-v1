import { Circle } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need to start a website
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Astro comes batteries included. It takes the best parts of state-of-the-art tools and adds its own
              innovations.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 fill-gray-900 text-gray-900 dark:fill-gray-50 dark:text-gray-50" />
              <h3 className="text-lg font-bold">Bring Your Own Frameworks</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Build your site using React, Svelte, Vue, Preact, web-components, or just plain old HTML + JavaScript.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 fill-gray-900 text-gray-900 dark:fill-gray-50 dark:text-gray-50" />
              <h3 className="text-lg font-bold">100% Static HTML, No JS</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 fill-gray-900 text-gray-900 dark:fill-gray-50 dark:text-gray-50" />
              <h3 className="text-lg font-bold">On-Demand Components</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need some JS? Astro can automatically hydrate interactive components when they become visible on the page.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 fill-gray-900 text-gray-900 dark:fill-gray-50 dark:text-gray-50" />
              <h3 className="text-lg font-bold">Island Integration</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm
              packages.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 fill-gray-900 text-gray-900 dark:fill-gray-50 dark:text-gray-50" />
              <h3 className="text-lg font-bold">SEO-Enabled</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Automatic sitemaps, RSS feeds, pagination, and collections take the pain out of SEO and syndication. Build
              faster.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 fill-gray-900 text-gray-900 dark:fill-gray-50 dark:text-gray-50" />
              <h3 className="text-lg font-bold">Community</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Astro is an open source project powered by hundreds of contributors cooking thousands of individual
              contributions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
