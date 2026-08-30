const fold = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')

const COUNTRY_ALIASES = new Map<string, string>([
  ['brasil', 'Brazil'],
  ['brazil', 'Brazil'],
  ['brasilien', 'Brazil']
])

export function canonicalCountryName(country: string | null | undefined): string | null {
  const raw = country?.trim()
  if (!raw) return null
  return COUNTRY_ALIASES.get(fold(raw)) ?? raw
}

export function knownCountryAlias(country: string | null | undefined): string | null {
  const raw = country?.trim()
  if (!raw) return null
  return COUNTRY_ALIASES.get(fold(raw)) ?? null
}

export function lastPlacePart(place: string | null | undefined): string | null {
  const raw = place?.trim()
  if (!raw) return null
  const parts = raw.split(',').map((p) => p.trim()).filter(Boolean)
  return parts.at(-1) ?? null
}

export function canonicalizeCountryInPlace(place: string | null | undefined): string {
  const raw = place?.trim()
  if (!raw) return ''
  const parts = raw.split(',').map((p) => p.trim()).filter(Boolean)
  if (parts.length === 0) return raw
  const country = canonicalCountryName(parts.at(-1))
  if (!country) return raw
  parts[parts.length - 1] = country
  return parts.join(', ')
}
