import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { resetPagination, shouldDisplayHighlightedAuctions } from './utils'
import FiltersReducer from './filters'
import { Reducer, Action } from './types'

const ActionsReducer: Reducer<Action> = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }

    case 'TOGGLE_HISTORY': {
      const nextState: ReturnType<typeof ActionsReducer> = {
        ...state,
        isHistory: !state.isHistory,
      }

      nextState.sortingOptions = {
        ...DEFAULT_SORT_OPTIONS[nextState.isHistory ? 'history' : 'current'],
      }

      if (nextState.isHistory) {
        nextState.filterState = {
          ...nextState.filterState,
          auctionIds: DEFAULT_FILTER_OPTIONS.auctionIds,
        }
      }

      return nextState
    }

    case 'SET_PAGINATION':
      return {
        ...state,
        paginationOptions: {
          ...state.paginationOptions,
          ...action.paginationOptions,
        },
      }

    case 'SET_SORTING':
      return {
        ...state,
        sortingOptions: { ...state.sortingOptions, ...action.sortingOptions },
      }

    case 'SET_PAGINATED_DATA':
      return shouldDisplayHighlightedAuctions({
        ...state,
        loading: false,
        paginatedData: action.paginatedData,
      })

    default:
      return FiltersReducer(state, action)
  }
}

const resetPaginationActions: Set<Action['type']> = new Set([
  'SET_SORTING',
  'TOGGLE_HISTORY',
])

const Reducer: Reducer<Action> = (state, action) => {
  const nextState = ActionsReducer(state, action)

  if (resetPaginationActions.has(action.type)) resetPagination(nextState)

  return nextState
}

export default Reducer
