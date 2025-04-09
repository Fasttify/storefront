import { HeroCarousel } from "./hero-carousel"

const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1741851374721-a546dc41561a?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern workspace with computers",
    title: "Transform Your Digital Experience",
    description:
      "Our platform provides cutting-edge solutions to elevate your online presence and streamline your workflow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1742615869881-95b71cee478c?q=80&w=2070&auto=format&fit=crop",
    alt: "Team collaboration meeting",
    title: "Built for Teams of All Sizes",
    description:
      "Whether you're a startup or enterprise, our tools scale with your needs and enhance collaboration.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1734700920704-1e8000437a00?q=80&w=2070&auto=format&fit=crop",
    alt: "Data visualization dashboard",
    title: "Data-Driven Insights",
    description:
      "Unlock the power of your data with our advanced analytics and beautiful visualization tools.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1742268350489-e5d1c0616c54?q=80&w=1974&auto=format&fit=crop",
    alt: "Mobile devices showing responsive design",
    title: "Seamless Across All Devices",
    description:
      "Experience perfect performance on desktop, tablet, or mobile with our responsive design approach.",
  },
]

const Hero = () => {
  return (
    <section className="w-full h-screen -mt-16">
      <HeroCarousel
        items={carouselItems}
        autoPlaySpeed={3000}
        height="100vh"
        enableAutoPlay={true}
      />
    </section>
  )
}

export default Hero
