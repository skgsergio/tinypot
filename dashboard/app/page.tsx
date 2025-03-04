'use client'

import { SSHTopAS } from '@/components/SSHTopAS'
import { SSHTopCountry } from '@/components/SSHTopCountry'
import { SSHTopIP } from '@/components/SSHTopIP'
import { HTTPTopAS } from '@/components/HTTPTopAS'
import { HTTPTopCountry } from '@/components/HTTPTopCountry'
import { HTTPTopIP } from '@/components/HTTPTopIP'
import { HTTPTopURL } from '@/components/HTTPTopURL'
import { HTTPTopUA } from '@/components/HTTPTopUA'
import { Layout, Row } from '@/components/ui/layout'
import { useDateParams } from '@/lib/utils'
import { Suspense } from 'react'
import { SSHTopCMDs } from '@/components/SSHTopCMDs'

function Home() {
  const [dateParams] = useDateParams()

  return (
    <Layout>
      <h2 className="font-sans text-lg">SSH Honeypot</h2>
      <Row>
        <SSHTopAS {...dateParams} />
        <SSHTopIP {...dateParams} />
        <SSHTopCountry {...dateParams} />
      </Row>
      <SSHTopCMDs {...dateParams} />
      <h2 className="font-sans text-lg">HTTP Honeypot</h2>
      <Row>
        <HTTPTopAS {...dateParams} />
        <HTTPTopIP {...dateParams} />
        <HTTPTopCountry {...dateParams} />
      </Row>
      <HTTPTopURL {...dateParams} />
      <HTTPTopUA {...dateParams} />
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
