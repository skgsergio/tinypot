'use client'

import { SSHTopAS } from '@/components/SSHTopAS'
import { SSHTopCountry } from '@/components/SSHTopCountry'
import { SSHTopIP } from '@/components/SSHTopIP'
import { SSHTopCMDs } from '@/components/SSHTopCMDs'
import { SSHTopUsers } from '@/components/SSHTopUsers'
import { SSHTopPasswords } from '@/components/SSHTopPasswords'
import { SSHTopCredentials } from '@/components/SSHTopCredentials'
import { HTTPTopAS } from '@/components/HTTPTopAS'
import { HTTPTopCountry } from '@/components/HTTPTopCountry'
import { HTTPTopIP } from '@/components/HTTPTopIP'
import { HTTPTopURL } from '@/components/HTTPTopURL'
import { HTTPTopUA } from '@/components/HTTPTopUA'
import { Layout, ChartRow } from '@/components/ui/layout'
import { useDateParams } from '@/lib/utils'
import { Suspense } from 'react'

function Home() {
  const [dateParams] = useDateParams()

  return (
    <Layout>
      <h2 className="font-sans text-lg">SSH Honeypot</h2>
      <ChartRow>
        <SSHTopAS {...dateParams} />
        <SSHTopIP {...dateParams} />
        <SSHTopCountry {...dateParams} />
      </ChartRow>
      <ChartRow>
        <SSHTopCredentials {...dateParams} />
        <SSHTopUsers {...dateParams} />
        <SSHTopPasswords {...dateParams} />
      </ChartRow>
      <ChartRow>
        <SSHTopCMDs {...dateParams} />
      </ChartRow>
      <h2 className="font-sans text-lg">HTTP Honeypot</h2>
      <ChartRow>
        <HTTPTopAS {...dateParams} />
        <HTTPTopIP {...dateParams} />
        <HTTPTopCountry {...dateParams} />
      </ChartRow>
      <ChartRow>
        <HTTPTopURL {...dateParams} />
        <HTTPTopUA {...dateParams} />
      </ChartRow>
    </Layout>
  )
}

export default function SuspendedHome() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}
