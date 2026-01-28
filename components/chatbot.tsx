'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  {
    id: 'q1',
    text: 'Advise recommendation based on current overview!',
    response: 'Based on the current food security overview, I recommend the following actions:\n\n1. **Immediate Priority**: Address the 23 critical risk items in Southeast Asia, particularly focusing on supply chain disruptions in Vietnam and Thailand.\n\n2. **Supply Diversification**: Increase wheat sourcing from Australia and Canada to reduce dependency on single-source suppliers. Current concentration of 45% from Vietnam poses significant risk.\n\n3. **Inventory Management**: Build strategic reserves for rice and wheat to cover at least 90 days of demand based on the projected shortfall of 2.3M tonnes in Q2.\n\n4. **Risk Mitigation**: Deploy early warning systems for climate-related disruptions and establish alternative logistics routes through Singapore and Malaysia.\n\n5. **Supplier Engagement**: Initiate discussions with top-rated suppliers (reliability >95%) to secure long-term contracts with price stability clauses.'
  },
  {
    id: 'q2',
    text: 'How to minimize incident?',
    response: 'To minimize food security incidents, implement these strategic measures:\n\n**Prevention Strategies:**\n• Deploy predictive analytics models to identify risks 30-60 days in advance\n• Establish real-time monitoring of key supply routes and weather patterns\n• Implement automated alert systems for price volatility and supply disruptions\n\n**Response Protocols:**\n• Activate rapid response teams within 4 hours of incident detection\n• Maintain pre-negotiated emergency contracts with backup suppliers\n• Ensure 72-hour emergency stock reserves at strategic distribution centers\n\n**Mitigation Actions:**\n• Diversify supplier base across minimum 3 geographic regions per commodity\n• Implement quality control checkpoints at critical nodes\n• Establish clear escalation procedures and decision-making frameworks\n\n**Monitoring:**\n• Weekly review of risk indicators and supplier performance\n• Monthly stress testing of supply chain resilience\n• Quarterly scenario planning exercises with stakeholders'
  },
  {
    id: 'q3',
    text: 'How to reduce dependency of importing from Vietnam?',
    response: 'Strategic plan to reduce import dependency on Vietnam:\n\n**Short-term Actions (0-6 months):**\n• Increase rice imports from Thailand (+15%) and India (+20%)\n• Activate existing contracts with alternative suppliers in Cambodia and Myanmar\n• Negotiate spot purchases from Australia and Pakistan to cover immediate gaps\n\n**Medium-term Strategy (6-18 months):**\n• Establish formal trade agreements with diversified supplier base:\n  - Thailand: Target 25% of rice imports\n  - India: Target 30% of rice imports\n  - Cambodia: Target 10% of rice imports\n  - Maintain Vietnam at 35% (reduced from current 45%)\n\n• Invest in domestic production capacity where feasible\n• Develop strategic partnerships with regional cooperatives\n\n**Long-term Resilience (18+ months):**\n• Build regional warehousing infrastructure in multiple countries\n• Implement contract farming programs in alternative regions\n• Establish commodity futures hedging strategy\n• Create regional supply chain network with multiple sourcing options\n\n**Risk Management:**\n• Maintain buffer stock equivalent to 60 days of Vietnam import volume\n• Set maximum dependency threshold of 30% for any single country\n• Quarterly review and adjustment of sourcing strategy'
  }
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Find matching suggested question or use default response
    const suggestedQuestion = SUGGESTED_QUESTIONS.find(q => 
      q.text.toLowerCase() === text.toLowerCase()
    )

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: suggestedQuestion?.response || "Sorry we're unable to help you right now. Please try one of the suggested questions below or contact support for personalized assistance.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 800)

    setInputValue('')
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col max-w-[calc(100vw-3rem)] sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-90">Food Security Advisor</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-medium mb-2">Welcome to Food Security AI Assistant</p>
                <p className="text-xs">Ask me anything or try one of the suggested questions below.</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground border border-border'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-4 pb-3 space-y-2 border-t border-border pt-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Suggested Questions:</p>
            {SUGGESTED_QUESTIONS.map((question) => (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal bg-transparent"
                onClick={() => handleSuggestedQuestion(question.text)}
              >
                <span className="text-xs">{question.text}</span>
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
