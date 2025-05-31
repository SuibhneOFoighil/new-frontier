import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'

// Secure token validation
function validateToken(token: string): { email: string; timestamp: number } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const [email, timestampStr, signature] = decoded.split('|')
    
    if (!email || !timestampStr || !signature) {
      return null
    }

    const timestamp = parseInt(timestampStr, 10)
    
    // Token expires after 24 hours
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      return null
    }

    // Verify signature
    const expectedSignature = createHash('sha256')
      .update(`${email}|${timestamp}|${process.env.NEXT_PUBLIC_CONFIRMATION_SECRET_KEY || 'fallback-secret'}`)
      .digest('hex')
    
    const providedSignature = Buffer.from(signature, 'hex')
    const expectedBuffer = Buffer.from(expectedSignature, 'hex')
    
    if (providedSignature.length !== expectedBuffer.length || 
        !timingSafeEqual(providedSignature, expectedBuffer)) {
      return null
    }

    return { email, timestamp }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(new URL('/?error=invalid-token', request.url))
    }

    const tokenData = validateToken(token)
    if (!tokenData) {
      return NextResponse.redirect(new URL('/?error=invalid-token', request.url))
    }

    const { email } = tokenData

    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      console.error('NEXT_PUBLIC_RESEND_API_KEY not configured')
      return NextResponse.redirect(new URL('/?error=service-unavailable', request.url))
    }

    const audienceId = process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID
    
    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID not configured')
      return NextResponse.redirect(new URL('/?error=service-unavailable', request.url))
    }

    // Add to Resend audience
    const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Resend API error:', errorData)
      
      // Handle duplicate contact gracefully
      if (errorData.includes('already exists') || errorData.includes('duplicate')) {
        return NextResponse.redirect(new URL('/?confirmed=true&already=true', request.url))
      }
      
      return NextResponse.redirect(new URL('/?error=subscription-failed', request.url))
    }

    // Redirect to success page
    return NextResponse.redirect(new URL('/?confirmed=true', request.url))

  } catch (error) {
    console.error('Confirmation error:', error)
    return NextResponse.redirect(new URL('/?error=confirmation-failed', request.url))
  }
}