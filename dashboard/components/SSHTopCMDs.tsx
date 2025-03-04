'use client'

import './Tables.css'
import { Table } from '@tinybirdco/charts'

export function SSHTopCMDs(params: {
  date_from?: string
  date_to?: string
  page?: number
  page_size?: number
}) {
  return (
    <Table
      endpoint="https://api.tinybird.co/v0/pipes/ssh_top_cmds.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      categories={['executions', 'cmd']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="SSH Top CMDs"
      height="545px"
      padding="16px"
      params={params}
    />
  )
}
