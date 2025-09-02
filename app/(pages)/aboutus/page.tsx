// "use client"

// import { useState, useEffect } from "react"

// // Mock team data - replace with your actual team members
// const teamMembers = [
//   {
//     id: 1,
//     name: "Abhijith",
//     role: "Graphic Designer",
//     image: "/aboutus/team-member-1.jpg",
//     bio: "Data-driven marketing expert specializing in performance campaigns."
//   },
//   {
//     id: 2,
//     name: "Poornima",
//     role: "Brand Strategist",
//     image: "/aboutus/team-member-2.jpg",
//     bio: "Data-driven marketing expert specializing in performance campaigns."
//   },
//   {
//     id: 3,
//     name: "Baranee dharan",
//     role:"Data Analyst",
//     image: "/aboutus/team-member-3.jpg",
//     bio: "Data-driven marketing expert specializing in performance campaigns."
//   },
//   { 
//     id: 4,
//     name: "Prabhu Deva",
//     role: "Video Editor",
//     image: "/aboutus/team-member-4.jpg",
//     bio: "Data-driven marketing expert specializing in performance campaigns."
//   },
//   {
//     id: 5,
//     name: "Jeeva",
//     role: "SEO Specialist",
//     image: "/aboutus/team-member-5.jpg",
//     bio: "Data-driven marketing expert specializing in performance campaigns."
//   }
// ]

// function TeamCards() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//       {teamMembers.map((member) => (
//         <div 
//           key={member.id} 
//           className="group relative bg-white rounded-2xl  transition-all duration-300 border border-gray-200"
//         >
//           {/* ID Card Header */}
//           <div className="bg-black p-4 rounded-t-2xl">
//             <div className="flex items-center justify-between">
//               <div className="text-white font-bold text-sm uppercase tracking-wider">
//                 Team Member ID
//               </div>
//               <div className="text-white font-mono text-xs">
//                 #{member.id.toString().padStart(3, '0')}
//               </div>
//             </div>
//           </div>

//           {/* Photo Section */}
//           <div className="relative p-6 pb-4">
//             <div className="relative w-32 h-32 mx-auto mb-4">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-full object-cover rounded-full border-4 border-gray-100 shadow-md"
//               />
//             </div>

//             {/* Name & Role */}
//             <div className="text-center mb-4">
//               <h3 className="text-xl font-bold text-black mb-1">
//                 {member.name}
//               </h3>
//               <p className="text-[#000000] font-semibold text-sm uppercase tracking-wide">
//                 {member.role}
//               </p>
//             </div>

//             {/* Bio */}
//             <div className="p-4 mb-4">
//               <p className="text-gray-600 text-sm leading-relaxed text-center">
//                 {member.bio}
//               </p>
//             </div>

//             {/* ID Card Footer */}
//             <div className="border-t border-gray-200 pt-4">
//               <div className="flex justify-between items-center text-xs text-gray-500">
//                 <span>AUTHORIZED</span>
//                 <span className="font-mono">2024</span>
//               </div>
//             </div>
//           </div>

//           {/* Holographic effect on hover */}
//           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
//         </div>
//       ))}
//     </div>
//   )
// }

// function VideoInline({ src }: { src: string }) {
//   return (
//     <div className="relative w-full h-auto overflow-hidden rounded-2xl">
//       <video
//         src={src}
//         muted
//         loop
//         autoPlay
//         playsInline
//         className="w-full h-auto object-contain"
//       />
//     </div>
//   )
// }

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-[#F6F7F9] text-black py-12 md:py-20">
//       <div className="container mx-auto px-4 md:px-6">
        
//         {/* HERO SECTION */}
//         <section className="mb-16 md:mb-24">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//               {/* Content */}
//               <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
//                 <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//                   And the love for{" "}
//                   <span className="text-[#000000]">art</span>{" "}
//                   brought us here…
//                 </h1>

//                 <div className="space-y-4 text-lg text-gray-600">
//                   <p>
//                     We come from the land where they say "Va Nga Po Nga" the most
//                     respectful city in Tamil Nadu, Coimbatore. Our team, drawn from
//                     across India, speaks the language of data, strategy and growth,
//                     which translates into creative impact!
//                   </p>
//                   <p>
//                     We happily take on projects across packaging, design, social media
//                     marketing, performance marketing, business consulting to anything
//                     your brand needs, our team knows exactly what to do!
//                   </p>
//                 </div>
//               </div>

//               {/* Video */}
//               <div className="lg:col-span-5">
//                 <VideoInline src="/aboutus/india.mp4" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* TEAM SECTION */}
//         <section className="mb-16 md:mb-24">
//           <div className="max-w-6xl mx-auto">
//             {/* Section Header */}
//             <div className="text-center mb-12">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                 Meet the{" "}
//                 <span className="text-[#000000]">Team</span>
//               </h2>
//               <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                 Who's going to be working on your brand's growth.
//               </p>
//             </div>

//             {/* Team Cards */}
//             <TeamCards />
//           </div>
//         </section>

//       </div>
//     </div>
//   )
// }
"use client"

function VideoInline({ src }: { src: string }) {
  return (
    <div className="relative w-full h-auto overflow-hidden rounded-2xl">
      <video
        src={src}
        muted
        loop
        autoPlay
        playsInline
        className="w-full h-auto object-contain"
      />
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-black">
      <div>
        {/* HERO SECTION */}
        <section className="mb-12 md:mb-16">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="Creative team collaboration in black and white"
            className="w-full h-64 md:h-80 object-cover filter grayscale brightness-110 contrast-125 rounded-2xl mb-8"
          />
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Content */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  And the love for <span className="text-[#000000]">art</span> brought us here…
                </h1>

                <div className="space-y-3 text-base text-gray-600">
                  <p>
                    We come from the land where they say "Vaanga Poonga" — the most
                    respectful city in Tamil Nadu, Coimbatore. Our team, drawn from
                    across India, speaks the language of data, strategy and growth,
                    which translates into creative impact!
                  </p>
                  <p>
                    We happily take on projects across packaging, design, social media
                    marketing, performance marketing, business consulting — anything
                    your brand needs, our team knows exactly what to do!
                  </p>
                </div>
              </div>

              {/* Video */}
              <div className="lg:col-span-5">
                <VideoInline src="/aboutus/india.mp4" />
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="mb-8 md:mb-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Meet the <span className="text-[#000000]">Team</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Who's going to be working on your brand's growth.
            </p>

            {/* Team intro copy - condensed */}
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                We are a mix of seasoned specialists and young creatives from all
                kinds of backgrounds, with years of marketing experience and a knack
                for knowing what works. No hierarchy here—everyone gets involved in
                every project to create content that's on-trend, consistent and truly
                sounds like your brand.
              </p>
            </div>

            {/* Team image */}
            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/aboutus/team.JPG"
                alt="Our Creative Team"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}