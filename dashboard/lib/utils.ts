import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns/format'
import { subDays } from 'date-fns/subDays'
import { useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { DateParams } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useDateParams() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const dateParams: DateParams = {
    date_from:
      searchParams.get('date_from') ||
      format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    date_to: searchParams.get('date_to') || format(new Date(), 'yyyy-MM-dd'),
  }

  const setDateParams = (dateRange: DateParams) => {
    const params = new URLSearchParams(searchParams.toString())
    if (dateRange.date_from) {
      params.set('date_from', dateRange.date_from)
    }

    if (dateRange.date_to) {
      params.set('date_to', dateRange.date_to)
    }

    router.push(`?${params.toString()}`)
  }

  return [dateParams, setDateParams] as const
}
