const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">ServicesApp</h2>
              <p className="mt-2 text-sm">Find and book professional services</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/about" className="text-sm hover:text-primary">
                 Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm hover:text-primary">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm hover:text-primary">
               Terminos de servicio
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm">&copy; 2023 ServicesApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  