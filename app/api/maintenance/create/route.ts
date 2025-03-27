import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Validate request data
    if (!data.issueType || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real app, you'd save to a database here
    const request = {
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data
    }

    // Send notification to building manager (in a real app)
    
    return NextResponse.json(
      { success: true, request },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 