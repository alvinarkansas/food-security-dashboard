import React from "react"
import { AppShell } from '@/components/app-shell'
import { Chatbot } from '@/components/chatbot'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppShell>{children}</AppShell>
      <Chatbot />
    </>
  )
}
