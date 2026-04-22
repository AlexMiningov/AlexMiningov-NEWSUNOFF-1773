export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const data = await request?.json()
    const { name, phone, email, message } = data ?? {}

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Заполните обязательные поля: имя, телефон и сообщение' },
        { status: 400 }
      )
    }

    // Save to database
    const contactMsg = await prisma.contactMessage.create({
      data: {
        name: String(name ?? ''),
        phone: String(phone ?? ''),
        email: String(email ?? ''),
        message: String(message ?? ''),
      },
    })

    // Send email notification
    try {
      const appUrl = process.env.NEXTAUTH_URL ?? ''
      let appHost = 'sunoff'
      try { appHost = new URL(appUrl).hostname?.split?.('.')?.[0] ?? 'sunoff' } catch {}

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #66cc00; padding-bottom: 10px;">
            ✉️ Новое сообщение с сайта
          </h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Имя:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Телефон:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email || 'не указан'}</p>
            <p style="margin: 10px 0;"><strong>Сообщение:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #66cc00;">
              ${message}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">ID сообщения: ${contactMsg?.id ?? 'N/A'}</p>
        </div>
      `

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_CONTACT,
          subject: `Новое сообщение с сайта от ${name}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'i@sunoff.by',
          sender_alias: 'Sunoff',
        }),
      })
    } catch (emailErr: any) {
      console.error('Email notification error:', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Сообщение успешно отправлено' })
  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
