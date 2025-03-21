import { NextResponse } from 'next/server'

export const runtime = 'edge'

interface LevyReminder {
  unitNumber: string
  amount: number
  dueDate: string
}

export async function POST(request: Request) {
  try {
    const { unitNumber, amount, dueDate } = await request.json() as LevyReminder
    
    // In a real application, this would:
    // 1. Validate the input data
    // 2. Connect to a database to get resident details
    // 3. Send email notifications
    // 4. Log the reminder in an audit trail
    
    // Example response
    return NextResponse.json({
      success: true,
      message: 'Levy reminder sent successfully',
      details: {
        unitNumber,
        amount,
        dueDate,
        sentAt: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to send levy reminder' },
      { status: 500 }
    )
  }
}

// This GET endpoint would be used to check reminder status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const unitNumber = searchParams.get('unitNumber')
  
  if (!unitNumber) {
    return NextResponse.json(
      { success: false, message: 'Unit number is required' },
      { status: 400 }
    )
  }
  
  // In a real application, this would fetch reminder history from a database
  return NextResponse.json({
    success: true,
    reminders: [
      {
        unitNumber,
        amount: 500,
        dueDate: '2024-04-01',
        status: 'sent',
        sentAt: '2024-03-15T00:00:00Z'
      }
    ]
  })
} 