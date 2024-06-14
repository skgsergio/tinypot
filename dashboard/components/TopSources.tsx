'use client'

import { BarList } from '@tinybirdco/charts'

export function TopSources(params: {
  date_from?: string
  date_to?: string
  limit?: number
  skip?: number
}) {
  return (
    <BarList
      endpoint="https://api.tinybird.co/v0/pipes/top_sources.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      index="referrer"
      categories={['hits', 'visits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="Top sources"
      height="300px"
      padding="16px"
      params={params}
    />
  )
}
