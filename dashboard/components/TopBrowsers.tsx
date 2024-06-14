'use client'

import { DonutChart } from '@tinybirdco/charts'

export function TopBrowsers(params: {
  date_from?: string
  date_to?: string
  limit?: number
  skip?: number
}) {
  return (
    <DonutChart
      endpoint="https://api.tinybird.co/v0/pipes/top_browsers.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      index="browser"
      categories={['visits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="Top browsers"
      showLegend={true}
      height="300px"
      padding="16px"
      params={params}
    />
  )
}
