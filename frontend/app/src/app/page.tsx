import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/app/services/page";
const featuredServices = [
  {
    id: "1",
    title: "Home Cleaning",
    description: "Professional home cleaning services",
    price: 50,
    category: "Cleaning",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Plumbing Repair",
    description: "Expert plumbing repair and installation",
    price: 80,
    category: "Home Repair",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Personal Training",
    description: "Personalized fitness training sessions",
    price: 60,
    category: "Fitness",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Find Professional Services Near You</h1>
        <p className="text-xl text-gray-600 mb-8">Book trusted professionals for all your needs</p>
        <Link
          href="/services"
          className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Explore Services
        </Link>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Become a Service Provider</h2>
            <p className="text-gray-600 mb-4">Join our platform and start offering your services to a wide audience.</p>
            <Link
              href="/register"
              className="bg-secondary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Sign Up as Professional
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Become a Service Provider"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
