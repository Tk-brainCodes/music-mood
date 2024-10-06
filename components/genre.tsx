"use client";

import {useState} from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Genre list with popular genres in Africa, UK, America, India, and Korea
export const genres = [
  // Africa
  { value: 'afrobeats', label: 'Afrobeats' },
  { value: 'afropop', label: 'Afropop' },
  { value: 'highlife', label: 'Highlife' },
  { value: 'kwaito', label: 'Kwaito' },
  { value: 'bongo-flava', label: 'Bongo Flava' },
  { value: 'naija-hip-hop', label: 'Naija Hip Hop' },
  { value: 'gqom', label: 'Gqom' },
  { value: 'soukus', label: 'Soukous' },
  
  // UK
  { value: 'grime', label: 'Grime' },
  { value: 'uk-garage', label: 'UK Garage' },
  { value: 'britpop', label: 'Britpop' },
  { value: 'drum-and-bass', label: 'Drum and Bass' },
  { value: 'uk-hip-hop', label: 'UK Hip Hop' },
  { value: 'indie-rock', label: 'Indie Rock' },

  // America (USA)
  { value: 'hip-hop', label: 'Hip Hop' },
  { value: 'rnb', label: 'R&B' },
  { value: 'country', label: 'Country' },
  { value: 'pop', label: 'Pop' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'blues', label: 'Blues' },
  { value: 'edm', label: 'EDM' },
  { value: 'trap', label: 'Trap' },

  // India
  { value: 'bollywood', label: 'Bollywood' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'hindustani-classical', label: 'Hindustani Classical' },
  { value: 'carnatic', label: 'Carnatic' },
  { value: 'bhajan', label: 'Bhajan' },
  { value: 'tollywood', label: 'Tollywood' },
  { value: 'indian-pop', label: 'Indian Pop' },

  // Korea
  { value: 'k-pop', label: 'K-Pop' },
  { value: 'k-hip-hop', label: 'K-Hip Hop' },
  { value: 'k-indie', label: 'K-Indie' },
  { value: 'trot', label: 'Trot' },
  { value: 'ballad', label: 'K-Ballad' },
];

type GenreComboboxProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function GenreCombobox({ value, setValue }: GenreComboboxProps) {
   const [open, setOpen] = useState(false)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? genres.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search genres..." />
          <CommandList>
            <CommandEmpty>No genres found.</CommandEmpty>
            <CommandGroup>
              {genres.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
