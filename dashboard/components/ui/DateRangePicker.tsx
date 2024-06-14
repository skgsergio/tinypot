'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns/format'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DateParams } from '@/lib/types'

export function DateRangePicker({
  dateParams,
  onChange,
}: {
  dateParams: DateParams
  onChange: (dateParams: DateParams) => void
}) {
  const date: DateRange = {
    from: dateParams.date_from ? new Date(dateParams.date_from) : undefined,
    to: dateParams.date_to ? new Date(dateParams.date_to) : undefined,
  }

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              'bg-white hover:bg-white'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={date =>
              onChange({
                date_from: date?.from
                  ? format(date.from, 'yyyy-MM-dd')
                  : undefined,
                date_to: date?.to ? format(date.to, 'yyyy-MM-dd') : undefined,
              })
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
