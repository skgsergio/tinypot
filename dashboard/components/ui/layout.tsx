'use client'
import * as React from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useDateParams } from '@/lib/utils'
import { DateRangePicker } from './DateRangePicker'

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [dateParams, setDateParams] = useDateParams()
  return (
    <main className="flex min-h-screen flex-col p-12 gap-8 max-w-[1400px] mx-auto">
      <h1 className="font-sans text-xl">Tinypot dashboard</h1>
      <p>
        <a href="https://github.com/skgsergio/tinypot/"><GitHubLogoIcon className="inline h-5 w-5" /></a>
      </p>
      <div className="flex justify-end w-full">
        <DateRangePicker dateParams={dateParams} onChange={setDateParams} />
      </div>
      {children}
    </main>
  )
}

export function Row({ children }: Readonly<{ children?: React.ReactNode }>) {
  return <div className="flex flex-col lg:flex-row gap-8 w-full">{children}</div>
}
