'use client'

import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Command, CommandInput, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCitySearch } from '@/lib/hooks/use-city-search'

export function SearchBox() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { cities } = useCitySearch(searchQuery)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[320px] justify-between"
        >
          Select city
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0">
        <Command>
          <CommandInput
            placeholder="Search city..."
            className="h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {cities?.map((city) => {
              return (
                <a
                  key={city.id}
                  className="px-3 py-1 text-sm flex items-center hover:bg-muted"
                  href={`/weather-app/details?lat=${city.latitude}&long=${city.longitude}`}
                >
                  {city.name} ({city.country})
                </a>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
