'use client'

import { BarList } from '@tinybirdco/charts'

export function SSHTopIP(params: {
  country_code?: string
  date_from?: string
  date_to?: string
  page?: number
  page_size?: number
}) {
  return (
    <BarList
      endpoint="https://api.tinybird.co/v0/pipes/ssh_top_ip.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      index="client_ip"
      categories={['hits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="SSH Top IPs"
      height="490px"
      padding="16px"
      params={params}
    />
  )
}
