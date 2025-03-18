'use client'

import { BarList } from '@tinybirdco/charts'

export function HTTPTopUA(params: {
  date_from?: string
  date_to?: string
  page?: number
  page_size?: number
}) {
  return (
    <BarList
      endpoint={`https://${process.env.NEXT_PUBLIC_TINYBIRD_HOST}/v0/pipes/http_top_useragent.json?exclude_empty=true`}
      token={process.env.NEXT_PUBLIC_TINYBIRD_PIPE_READ_TOKEN}
      index="user_agent"
      categories={['hits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="HTTP Top User-Agents"
      height="490px"
      padding="16px"
      params={params}
    />
  )
}
