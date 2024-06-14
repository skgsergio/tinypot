'use client'

import { SSHTopAS } from '@/components/SSHTopAS'
import { SSHTopCountry } from '@/components/SSHTopCountry'
import { HTTPTopAS } from '@/components/HTTPTopAS'
import { HTTPTopCountry } from '@/components/HTTPTopCountry'
import { HTTPTopURL } from '@/components/HTTPTopURL'
import { HTTPTopUA } from '@/components/HTTPTopUA'
import { Layout, Row } from '@/components/ui/layout'
import { useDateParams } from '@/lib/utils'
import { Suspense } from 'react'

function Home() {
  const [dateParams] = useDateParams()

  return (
    <Layout>
      <h2 className="font-sans text-lg">SSH Honeypot</h2>
      <Row>
        <SSHTopAS {...dateParams} />
        <SSHTopCountry {...dateParams} />
      </Row>
      <h2 className="font-sans text-lg">HTTP Honeypot</h2>
      <Row>
        <HTTPTopAS {...dateParams} />
        <HTTPTopCountry {...dateParams} />
      </Row>
      <HTTPTopURL exclude_root={"true"} {...dateParams} />
      <HTTPTopUA exclude_empty={"true"} {...dateParams} />
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
