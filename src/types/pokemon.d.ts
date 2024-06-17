export interface Pokemon {
  name: string
  url: string
  image: string | null | undefined
  other?: {
    abilities: any[]
    types: any[]
    held_items: any[]
    moves: any[]
  }
}
