'use client'

import './Tables.css'
import { Table } from '@tinybirdco/charts'

export function SSHTopPasswords(params: {
  date_from?: string
  date_to?: string
  page?: number
  page_size?: number
}) {
  return (
    <Table
      endpoint="https://api.tinybird.co/v0/pipes/ssh_top_credentials.json?page_size=20&what=password"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      categories={['uses', 'password']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="SSH Top Passwords"
      height="545px"
      padding="16px"
      params={params}
    />
  )
}
