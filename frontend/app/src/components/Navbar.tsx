import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">ServicesApp</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/services"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Servicios
            </Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link href="/auth/register" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Registro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

