import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-16">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <Link
            href="/about"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-4 text-center text-gray-400 dark:text-gray-500">
          © 2024 MANN Mental Health. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

