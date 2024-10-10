import React from 'react'
import Dashboard from '@/app/components/Dashboard'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">EPIC EHR AI Copilot</h1>
      <Dashboard />
    </main>
  )
}