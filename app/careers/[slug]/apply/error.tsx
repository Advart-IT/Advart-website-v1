"use client"

export default function ApplicationError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#F6F7F9] text-black mt-24 px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Unable to load this opening</h1>
      <p className="mb-6">Please try again in a moment.</p>
      <button
        onClick={reset}
        className="rounded-md bg-black text-white px-5 py-2.5"
      >
        Try again
      </button>
    </main>
  )
}
