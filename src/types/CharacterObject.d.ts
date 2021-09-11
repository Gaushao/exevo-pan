declare interface CharacterSkillsObject {
  magic: number
  club: number
  fist: number
  sword: number
  fishing: number
  axe: number
  distance: number
  shielding: number
}

declare interface CharacterObject {
  id: number
  nickname: string
  auctionEnd: number
  currentBid: number
  hasBeenBidded: boolean
  outfitId: string
  serverId: number
  vocationId: number
  level: number
  imbuements: string[]
  items: number[]
  charms: string[]
  transfer: boolean
  hasSoulwar: boolean
  skills: CharacterSkillsObject
  serverData: ServerObject
}

declare type PartialCharacterObject = Omit<CharacterObject, 'serverData'>

declare type MinifiedCharacterObject = [
  number,
  string,
  number,
  number,
  boolean,
  string,
  number,
  number,
  number,
  number[],
  number[],
  number[],
  boolean,
  number[],
  boolean,
]