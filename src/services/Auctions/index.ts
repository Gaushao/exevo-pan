import { endpoints, paths } from 'Constants'
import { serializeBody, buildHeaders } from './utils'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_STATE,
} from './defaults'
import { FetchAuctionPageParameters, CacheObject } from './types'

const CACHE_MAX_AGE = 180000

const EMPTY_RESPONSE: PaginatedData<CharacterObject> = {
  page: [],
  pageIndex: 0,
  totalItems: 0,
  startOffset: 0,
  endOffset: 0,
  hasPrev: false,
  hasNext: false,
  sortingMode: 0,
  descendingOrder: false,
}

export default class AuctionsClient {
  static cache: CacheObject = {}

  static highlightedAuctionsUrl = `${endpoints.BASE_DATA}${paths.HIGHLIGHTED_AUCTIONS}`

  static getCache(key: string): PaginatedData<CharacterObject> | undefined {
    return this.cache[key]
  }

  static setCache(key: string, data: PaginatedData<CharacterObject>): void {
    this.cache[key] = data
    setTimeout(() => delete this.cache[key], CACHE_MAX_AGE)
  }

  static async fetchAuctionPage({
    paginationOptions = DEFAULT_PAGINATION_OPTIONS,
    sortOptions = DEFAULT_SORT_OPTIONS,
    filterOptions = DEFAULT_FILTER_STATE,
    endpoint,
  }: FetchAuctionPageParameters): Promise<PaginatedData<CharacterObject>> {
    const bodyPayload = serializeBody(
      paginationOptions,
      sortOptions,
      filterOptions,
    )

    const cachedResult = this.getCache(bodyPayload)
    if (cachedResult) return cachedResult

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: buildHeaders(endpoint),
        body: bodyPayload,
      })

      const data: PaginatedData<CharacterObject> = await response.json()
      this.setCache(bodyPayload, data)

      return data
    } catch (error: unknown) {
      console.log(error)
      return {
        ...EMPTY_RESPONSE,
        ...sortOptions,
        pageIndex: paginationOptions.pageIndex,
      }
    }
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    try {
      const response = await fetch(this.highlightedAuctionsUrl)
      const auctions: CharacterObject[] = await response.json()

      const currentTimestamp = +new Date() / 1000
      const activeAuctions = auctions.filter(
        (auction) => auction.auctionEnd > currentTimestamp,
      )

      return activeAuctions
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }
}