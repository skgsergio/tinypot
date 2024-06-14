'use client'

import { BarList } from '@tinybirdco/charts'

export function HTTPTopUA(params: {
  date_from?: string
  date_to?: string
  exclude_empty?: string
  page?: number
  page_size?: number
}) {
  return (
    <BarList
      endpoint="https://api.tinybird.co/v0/pipes/http_top_useragent.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      index="user_agent"
      categories={['hits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="HTTP Top User-Agents"
      height="480px"
      padding="16px"
      params={params}
    />
  )
}
