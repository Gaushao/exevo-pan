import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import characterData from '../../../bazaar-scraper/Output/CurrentAuctions.json'
import miniServerData from '../../../bazaar-scraper/Output/ServerData.json'

const serverArray = Object.values(
  miniServerData as Record<string, ServerObject>,
)

export const auctions = buildCharacterData(
  characterData as PartialCharacterObject[],
  serverArray,
)
