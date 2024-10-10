import React, { useState, useRef, useEffect } from 'react'
import { Patient, Message } from '../models/types'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'

type AICopilotProps = {
  patient: Patient | null
  onMessageSent: (message: string) => void
}

export default function AICopilot({ patient, onMessageSent }: AICopilotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        createdAt: new Date().toISOString(),
      }
      setMessages(prevMessages => [...prevMessages, userMessage])
      setInput('')
      onMessageSent(input)
      setIsTyping(true)

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: `Hmm, that's interesting...david has to answer this one "${input}"`,
          createdAt: new Date().toISOString(),
        }
        setMessages(prevMessages => [...prevMessages, aiMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaRobot className="mr-2" /> AI Copilot
      </h2>
      <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}>
              {message.content}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <span className="inline-block p-3 rounded-lg bg-gray-200 text-gray-500">
              Checking the database...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask the AI Copilot..."
        />
        <button 
          onClick={handleSend} 
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition duration-200"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  )
}