'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', unit: '', email: '', subject: '', message: '' })
    alert('Message sent successfully!')
  }

  const emergencyContacts = [
    {
      title: 'Building Security',
      phone: '0400 123 456',
      available: '24/7'
    },
    {
      title: 'Fire Emergency',
      phone: '000',
      available: '24/7'
    },
    {
      title: 'Maintenance Hotline',
      phone: '0400 789 012',
      available: '7:00 AM - 10:00 PM'
    },
    {
      title: 'Strata Manager',
      phone: '0400 345 678',
      available: 'Mon-Fri, 9:00 AM - 5:00 PM'
    }
  ]

  const faqs = [
    {
      question: 'How do I book the common facilities?',
      answer: 'You can book common facilities through the resident portal or by contacting the building manager. Bookings should be made at least 48 hours in advance.'
    },
    {
      question: 'What are the moving in/out procedures?',
      answer: 'Please notify the building manager at least 7 days before your move. Moving is permitted Monday to Saturday, 9:00 AM to 4:00 PM. You\'ll need to book the service elevator.'
    },
    {
      question: 'How do I pay my strata levies?',
      answer: 'Levies can be paid quarterly via direct debit, BPAY, or bank transfer. Contact the strata manager for your reference number and payment details.'
    },
    {
      question: 'What should I do if I lose my access key/fob?',
      answer: 'Report lost access devices immediately to building security. Replacement fobs can be obtained from the building manager for a fee of $100.'
    },
    {
      question: 'Are pets allowed in the building?',
      answer: 'Pets are allowed with prior approval from the strata committee. Submit a pet application form with your pet\'s details and vaccination records.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Contact Form Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-white mb-2">
          Contact Management
        </h1>
        <p className="text-blue-400 dark:text-blue-200 mb-6">
          Get in touch with the building management team
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Unit Number
              </label>
              <input
                type="text"
                required
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Emergency Contacts Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-white mb-6">
          Emergency Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">
                {contact.title}
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                {contact.phone}
              </p>
              <p className="text-sm text-blue-400 dark:text-blue-200">
                Available: {contact.available}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-blue-600 dark:text-blue-200">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 