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

import { useState, useEffect } from "react"

// Mock team data - replace with your actual team members
const teamMembers = [
  {
    id: 1,
    name: "Abhijith",
    role: "Graphic Designer",
    image: "/aboutus/team-member-1.jpg",
    bio: "Data-driven marketing expert specializing in performance campaigns.",
  },
  {
    id: 2,
    name: "Poornima",
    role: "Brand Strategist",
    image: "/aboutus/team-member-2.jpg",
    bio: "Data-driven marketing expert specializing in performance campaigns.",
  },
  {
    id: 3,
    name: "Baranee dharan",
    role: "Data Analyst",
    image: "/aboutus/team-member-3.jpg",
    bio: "Data-driven marketing expert specializing in performance campaigns.",
  },
  {
    id: 4,
    name: "Prabhu Deva",
    role: "Video Editor",
    image: "/aboutus/team-member-4.jpg",
    bio: "Data-driven marketing expert specializing in performance campaigns.",
  },
  {
    id: 5,
    name: "Jeeva",
    role: "SEO Specialist",
    image: "/aboutus/team-member-5.jpg",
    bio: "Data-driven marketing expert specializing in performance campaigns.",
  },
]

function TeamCards() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to change team member automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval) // Clean up the interval on component unmount
  }, [])

  const currentMember = teamMembers[currentIndex]

  // Handle mouse click to change member
  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px]" onClick={handleClick}> {/* Reduced height here */}
        {/* Left Side - Static Team Image with black effect */}
        <div className="relative h-full">
          <div className="h-full rounded-l-2xl lg:rounded-r-none rounded-r-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <img src="/aboutus/team.JPG" alt="Our Team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-30"></div> {/* Black overlay with reduced opacity */}
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Our Creative Team</h3>
              <p className="text-gray-200 text-sm">Passionate professionals dedicated to your success</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sliding ID Card */}
        <div className="relative h-full">
          <div className="bg-white rounded-r-2xl lg:rounded-l-none rounded-l-2xl overflow-hidden h-full flex flex-col">
            {/* ID Card Header */}
            <div className="bg-black p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="text-white font-bold text-sm uppercase tracking-wider">Team Member ID</div>
                <div className="text-white font-mono text-xs">#{currentMember.id.toString().padStart(3, "0")}</div>
              </div>
            </div>

            {/* Photo Section - flex-grow to fill remaining space */}
            <div className="p-8 flex-grow flex flex-col justify-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={currentMember.image || "/placeholder.svg"}
                  alt={currentMember.name}
                  className="w-full h-full object-cover rounded-full border-4 border-gray-100 "
                />
              </div>

              {/* Name & Role */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-black mb-2">{currentMember.name}</h3>
                <p className="text-black font-semibold text-base uppercase tracking-wide">{currentMember.role}</p>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <p className="text-gray-600 text-base leading-relaxed text-center">{currentMember.bio}</p>
              </div>

              {/* ID Card Footer */}
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>AUTHORIZED</span>
                  <span className="font-mono">2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Member Counter */}
          <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-mono">
            {currentIndex + 1} / {teamMembers.length}
          </div>
        </div>
      </div>
    </div>
  )
}

function VideoInline({ src }: { src: string }) {
  return (
    <div className="relative w-full h-auto overflow-hidden rounded-2xl">
      <video src={src} muted loop autoPlay playsInline className="w-full h-auto object-contain" />
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-black py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* HERO SECTION */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Content */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  And the love for <span className="text-[#000000]">art</span> brought us here…
                </h1>

                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    We come from the land where they say "Vaanga Poonga" the most respectful city in Tamil Nadu,
                    Coimbatore. Our team, drawn from across India, speaks the language of data, strategy and growth,
                    which translates into creative impact!
                  </p>
                  <p>
                    We happily take on projects across packaging, design, social media marketing, performance marketing,
                    business consulting to anything your brand needs, our team knows exactly what to do!
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
        <section className="mb-16 md:mb-24">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Meet the <span className="text-[#000000]">Team</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Who's going to be working on your brand's growth.
              </p>
            </div>

            {/* Team Cards */}
            <TeamCards />
          </div>
        </section>
      </div>
    </div>
  )
}
