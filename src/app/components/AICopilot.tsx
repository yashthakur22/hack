import React, { useState, useRef, useEffect } from 'react'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import ReactMarkdown from 'react-markdown'

type Message = {
  id: string
  role: 'user' | 'ai'
  content: string
}

type AICopilotProps = {
  patient: any
  onMessageSent: (message: string) => void
}

export default function AICopilot({ patient, onMessageSent }: AICopilotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sessionIdRef = useRef(uuidv4())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const truncateContent = (content: string, maxLength: number = 500) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  }

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
      }
      setMessages(prevMessages => [...prevMessages, userMessage])
      setInput('')
      onMessageSent(input)
      setIsLoading(true)

      try {
        const response = await fetch('https://7885-128-218-42-132.ngrok-free.app/invoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientId: patient.subject_id,
            query: input,
            sessionId: sessionIdRef.current
          }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log('API Response:', data)

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: truncateContent(data.content) || "I'm sorry, I didn't receive a valid response.",
        }
        setMessages(prevMessages => [...prevMessages, aiMessage])
      } catch (error) {
        console.error('Error:', error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: "I'm sorry, I encountered an error. Please try again.",
        }
        setMessages(prevMessages => [...prevMessages, errorMessage])
      } finally {
        setIsLoading(false)
      }
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
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <span className="inline-block p-3 rounded-lg bg-gray-200 text-gray-500">
              AI is typing...
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
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask the AI Copilot..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition duration-200"
          disabled={isLoading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  )
}