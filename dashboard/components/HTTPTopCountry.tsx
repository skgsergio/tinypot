'use client'

import { PieChart } from '@tinybirdco/charts'

export function HTTPTopCountry(params: {
  date_from?: string
  date_to?: string
  page?: number
  page_size?: number
}) {
  return (
    <PieChart
      endpoint="https://api.tinybird.co/v0/pipes/http_top_country.json"
      token={process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}
      index="country_code"
      categories={['ip_count']}
      colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
      borderRadius="8px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
      title="HTTP Top Countries"
      showLegend={true}
      height="490px"
      padding="16px"
      params={params}
    />
  )
}