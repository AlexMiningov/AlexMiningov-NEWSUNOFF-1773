export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const data = await request?.json()
    const { name, phone, email, serviceType, desiredDate } = data ?? {}

    if (!name || !phone || !serviceType) {
      return NextResponse.json(
        { success: false, message: 'Заполните обязательные поля: имя, телефон и тип услуги' },
        { status: 400 }
      )
    }

    // Save to database
    const booking = await prisma.booking.create({
      data: {
        name: String(name ?? ''),
        phone: String(phone ?? ''),
        email: String(email ?? ''),
        serviceType: String(serviceType ?? ''),
        desiredDate: String(desiredDate ?? ''),
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
            🚗 Новая запись на тонировку
          </h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Имя:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Телефон:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email || 'не указан'}</p>
            <p style="margin: 10px 0;"><strong>Услуга:</strong> ${serviceType}</p>
            <p style="margin: 10px 0;"><strong>Желаемая дата:</strong> ${desiredDate || 'не указана'}</p>
          </div>
          <p style="color: #666; font-size: 12px;">ID заявки: ${booking?.id ?? 'N/A'}</p>
        </div>
      `

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_BOOKING,
          subject: `Новая запись на тонировку от ${name}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'i@sunoff.by',
          sender_alias: 'Sunoff',
        }),
      })
    } catch (emailErr: any) {
      console.error('Email notification error:', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Заявка успешно создана' })
  } catch (error: any) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
