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
      className="block bg-white border border-slate-200 rounded-lg hover:border-sky-200 hover:shadow-lg transition-all duration-200"
    >
      <div className="px-6 py-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h3 className="text-lg font-medium text-sky-600">
              {title}
            </h3>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-3xl font-semibold text-sky-500">
            {value}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </a>
  )
} 