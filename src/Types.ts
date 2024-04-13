//fetch.ts
type SiteType = {
  id: number
  name: string
  max_power: number
  address: string
  start_date: Date
  picture: string
}

type DataPointType = {
  datetime: Date
  production: number
  reference: number
}

export type { SiteType, DataPointType }
