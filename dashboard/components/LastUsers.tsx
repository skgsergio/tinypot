'use client'

import { BarChart } from '@tinybirdco/charts'

export function LastUsers() {
  return (
    <BarChart
      endpoint="https://api.tinybird.co/v0/pipes/trend.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      index="t"
      categories={['visits']}
      colorPalette={['#27F795', '#008060']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="Last users"
      height="300px"
      padding="16px"
    />
  )
}
