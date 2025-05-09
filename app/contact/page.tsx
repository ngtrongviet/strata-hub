'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Save form data to Supabase
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ])

      if (insertError) {
        throw new Error(insertError.message)
      }

      // Reset form and show success message
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000) // Hide success message after 5 seconds
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
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
        <h1 className="text-3xl font-bold text-sky-600 mb-2">
          Contact Management
        </h1>
        <p className="text-slate-600 mb-6">
          Get in touch with the building management team
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl bg-white border border-slate-200 rounded-lg p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
              Message sent successfully!
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-sky-300' : 'bg-sky-500 hover:bg-sky-600'} text-white px-6 py-3 rounded-lg transition-colors flex justify-center items-center`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Emergency Contacts Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-sky-600 mb-6">
          Emergency Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 hover:border-sky-200 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-sky-600 mb-2">
                {contact.title}
              </h3>
              <p className="text-2xl font-bold text-sky-500 mb-2">
                {contact.phone}
              </p>
              <p className="text-sm text-slate-600">
                Available: {contact.available}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div>
        <h2 className="text-2xl font-bold text-sky-600 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 hover:border-sky-200 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-sky-600 mb-2">
                {faq.question}
              </h3>
              <p className="text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 