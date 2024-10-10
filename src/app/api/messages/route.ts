import { NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { role, content } = await request.json()
    const message = await prisma.message.create({
      data: { role, content },
    })
    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating message' }, { status: 500 })
  }
}