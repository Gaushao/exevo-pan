export type Action =
  | {
      type: 'SET_LOADING'
      value: boolean
    }
  | {
      type: 'SET_PAGE_INDEX'
      value: number
    }
  | {
      type: 'SET_SORTING_MODE'
      value: number
    }
  | {
      type: 'TOGGLE_DESCENDING_ORDER'
    }
  | {
      type: 'STORE_DATA'
      data: PaginatedData<CharacterObject>
    }

export interface AuctionsContextState {
  loading: boolean
  page: CharacterObject[]
  pageData: PageData
  sortingMode: number
  descendingOrder: boolean
}

export interface AuctionsContextValues extends AuctionsContextState {
  handlePaginatorFetch: (pageIndex: number) => void
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  initialPage: CharacterObject[]
  initialPageData: PageData
  initialSortingMode: number
  initialDescendingOrder: boolean
  children: React.ReactNode
}
