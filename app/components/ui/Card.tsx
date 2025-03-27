interface CardProps {
  title: string
  value: string
  description: string
  link: string
}

export function Card({ title, value, description, link }: CardProps) {
  return (
    <a
      href={link}
      className="block bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </a>
  )
} 