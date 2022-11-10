import {
  serializeFilter,
  serializePagination,
  serializeSort,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { links, endpoints } from 'Constants'
import { FetchAuctionPageArgs, FetchAuctionByIdArgs } from './types'

export default class AuctionsClient {
  private static getAuctionMode(history: boolean): keyof typeof serializeSort {
    return history ? 'history' : 'current'
  }

  static async fetchAuctionPage({
    filterOptions,
    paginationOptions,
    sortOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const endpoint = new URL(`${links.CANONICAL}${endpoints.AUCTIONS_ROUTE}`)
    const currentParams = new URLSearchParams()

    serializeFilter({ values: { ...filterOptions }, currentParams })
    serializePagination({ values: { ...paginationOptions }, currentParams })
    serializeSort[this.getAuctionMode(history)]({
      values: { ...sortOptions },
      currentParams,
    })

    endpoint.search = currentParams.toString()
    if (history) endpoint.searchParams.set('history', 'true')

    const response = await fetch(
      `${endpoints.AUCTIONS_ROUTE}${endpoint.search}`,
    )

    return response.json()
  }

  static async fetchAuctionById({
    id,
    from = 'any',
  }: FetchAuctionByIdArgs): Promise<CharacterObject | undefined> {
    try {
      const endpoint = new URL(`${links.CANONICAL}${endpoints.AUCTION_ROUTE}`)

      endpoint.searchParams.set('id', id.toString())
      endpoint.searchParams.set('from', from)

      const response = await fetch(
        `${endpoints.AUCTION_ROUTE}${endpoint.search}`,
      )

      if (response.status === 400) {
        throw Error(`Auction id ${id} not found`)
      }

      const result = await response.json()

      return result
    } catch {
      return undefined
    }
  }
}
