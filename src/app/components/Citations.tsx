import React from 'react'
import { FaQuoteLeft, FaExternalLinkAlt } from 'react-icons/fa'

type CitationsProps = {
  citations: string[]
}

export default function Citations({ citations }: CitationsProps) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaQuoteLeft className="mr-2" /> Citations
      </h2>
      {citations.length > 0 ? (
        <ul className="space-y-4">
          {citations.map((citation, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700">{citation}</p>
              <a href="#" className="text-blue-500 hover:underline mt-2 inline-flex items-center">
                View Source <FaExternalLinkAlt className="ml-1" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No citations available for this conversation yet.</p>
      )}
    </div>
  )
}