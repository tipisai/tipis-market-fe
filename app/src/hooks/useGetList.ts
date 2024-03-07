import { MarketAgentListData } from "@illa-public/market-agent/service"
import { MarketAIAgent } from "@illa-public/public-types"
import { AxiosResponse } from "axios"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import {
  UIEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  INITIAL_PAGE,
  LIMIT_ITEMS,
  PAGESIZE,
  SEARCH_KEY,
} from "@/constants/page"
import { InfoContext } from "@/context/infoContext"
import { PRODUCT_SORT_BY, ProductListParams } from "@/interface/common"
import { fetchAIgentList, fetchStarAIgentList } from "@/services/Client/aiAgent"
import { isCancelError } from "@/utils/net"

export const useGetList = (agentProduct?: MarketAgentListData) => {
  const { t } = useTranslation()
  const { userInfo } = useContext(InfoContext)
  const [sort, setSort] = useState(PRODUCT_SORT_BY.POPULAR)
  const marketListPage = useRef(INITIAL_PAGE)
  const controllerRef = useRef<AbortController | null>(null)
  const cacheTagList = useRef<string[]>([])

  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTag, setTag] = useState<string | undefined>(
    searchParams.get(SEARCH_KEY.CURRENT_HASH_TAG) || undefined,
  )
  const [search, setSearch] = useState<string | undefined>()

  // To resolve star page show recommend tag
  const cacheSearch = useRef<string | undefined>()

  const [agentList, setAgentList] = useState<MarketAIAgent[]>(
    agentProduct?.products || [],
  )

  const [tagList, setTagList] = useState<string[]>([])
  // more loading
  const [loading, setLoading] = useState(false)
  // page loading
  const [reLoading, setReLoading] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(agentProduct?.hasMore ?? true)

  const sortOptions = useMemo(() => {
    const options = [
      {
        label: t("dashboard.sort-type.popular"),
        value: PRODUCT_SORT_BY.POPULAR,
      },
      {
        label: t("dashboard.sort-type.recent"),
        value: PRODUCT_SORT_BY.LATEST,
      },
    ]
    if (userInfo && userInfo.userID) {
      options.push({
        label: t("dashboard.sort-type.star"),
        value: PRODUCT_SORT_BY.STARRED,
      })
    }
    return options
  }, [t, userInfo])

  const showRecommendTag: boolean = useMemo(() => {
    if (!!searchParams.get(SEARCH_KEY.CURRENT_HASH_TAG)) {
      return agentList.length === 0
    } else {
      if (sort === PRODUCT_SORT_BY.STARRED) {
        return (
          agentList.length === 0 &&
          activeTag === undefined &&
          !!cacheSearch.current
        )
      } else {
        return agentList.length === 0 && activeTag === undefined
      }
    }
  }, [activeTag, agentList.length, searchParams, sort])

  const getMarketList = useCallback(
    async (params?: Partial<ProductListParams>) => {
      const {
        sortedBy: changedSort,
        hashtags,
        search: changeSearch,
      } = params || {}
      const controller = new AbortController()
      if (!controllerRef.current) {
        controllerRef.current = controller
      } else {
        controllerRef.current.abort()
        controllerRef.current = controller
      }
      if (loading) return
      const page = marketListPage.current
      const currentSort = changedSort ?? sort
      const currentTag = hashtags ?? activeTag
      const currentSearch = changeSearch ?? search
      const requestParams = {
        limit: PAGESIZE,
        page,
        sortedBy: currentSort,
        search: currentSearch,
        hashtags: currentTag,
      }

      try {
        let res: AxiosResponse<MarketAgentListData>

        if (currentSort === PRODUCT_SORT_BY.STARRED) {
          res = await fetchStarAIgentList(requestParams, controller.signal)
        } else {
          res = await fetchAIgentList(requestParams, controller.signal)
        }
        if (marketListPage.current > INITIAL_PAGE) {
          setAgentList((prevState) =>
            prevState
              .concat(res.data.products as MarketAIAgent[])
              .slice(-LIMIT_ITEMS),
          )
        } else {
          setAgentList(res.data.products as MarketAIAgent[])
        }
        if (!res.data.hasMore) {
          setHasMoreData(false)
        } else if (res.data.hasMore && !hasMoreData) {
          setHasMoreData(true)
        }
        return res.data?.summaryHashtags
      } catch (e: unknown) {
        if (!isCancelError(e)) {
          setAgentList([])
        }
        setLoading(false)
        setReLoading(false)
      }
    },
    [loading, sort, activeTag, search, hasMoreData],
  )

  const loadMore = useCallback(async () => {
    if (loading) return
    setLoading(true)
    marketListPage.current += 1
    await getMarketList()
    setLoading(false)
  }, [getMarketList, loading])

  const handleCardScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement
      if (target.scrollHeight - target.scrollTop - target.clientHeight <= 800) {
        if (!hasMoreData) return
        loadMore()
      }
    },
    [hasMoreData, loadMore],
  )

  const handleSearchChange = useCallback(async (val?: string) => {
    setSearch(val)
  }, [])

  const onSearch = useCallback(async () => {
    setReLoading(true)
    marketListPage.current = 1
    const res = await getMarketList({ search })
    if (!search) {
      setTagList(cacheTagList.current)
    } else if (res && res.length > 0) {
      setTagList(res)
    } else {
      if (activeTag) {
        setTagList([activeTag])
      } else {
        setTagList([])
      }
    }
    cacheSearch.current = search
    setReLoading(false)
  }, [getMarketList, search, activeTag])

  const handleSortChange = useCallback(
    async (value: unknown) => {
      setSort(value as PRODUCT_SORT_BY)
      setReLoading(true)
      marketListPage.current = 1
      const res = await getMarketList({ sortedBy: value as PRODUCT_SORT_BY })
      console.log(res, value, search)
      if (
        (!res || res.length === 0) &&
        search &&
        value === PRODUCT_SORT_BY.STARRED &&
        !activeTag
      ) {
        setTagList([])
      } else if (search && res && res.length > 0) {
        setTagList(res)
      }
      setReLoading(false)
    },
    [getMarketList, search, activeTag],
  )

  const handleTagChange = useCallback(
    async (name?: string) => {
      setTag(name)
      setReLoading(true)
      marketListPage.current = 1
      const res = await getMarketList({ hashtags: name ?? "" })
      if ((!res || res.length < 1) && !name) {
        search && setTagList([])
      } else if (res && res?.length > 0 && search) {
        setTagList(res)
      }
      setReLoading(false)
    },
    [getMarketList, search],
  )

  const resetParams = useCallback(() => {
    setSort(PRODUCT_SORT_BY.POPULAR)
    setTag(undefined)
    setSearch(undefined)
    cacheSearch.current = undefined
    marketListPage.current = 1
  }, [])

  const handleCloseTag = useCallback(async () => {
    resetParams()
    setTagList(cacheTagList.current)
    await router.replace({ query: undefined }, undefined, {
      shallow: true,
    })
    setReLoading(true)
    await getMarketList({
      hashtags: "",
      search: "",
      sortedBy: PRODUCT_SORT_BY.POPULAR,
    })
    setReLoading(false)
  }, [getMarketList, resetParams, router])

  const handleClickEmptyTag = useCallback(
    async (name?: string) => {
      resetParams()
      setTagList(cacheTagList.current)
      if (searchParams.get(SEARCH_KEY.CURRENT_HASH_TAG)) {
        await router.replace({ query: undefined }, undefined, {
          shallow: true,
        })
      }
      setTag(name)
      setReLoading(true)
      await getMarketList({
        hashtags: name ?? "",
        sortedBy: PRODUCT_SORT_BY.POPULAR,
        search: "",
      })
      setReLoading(false)
    },
    [getMarketList, resetParams, router, searchParams],
  )

  useEffect(() => {
    cacheTagList.current = agentProduct?.recommendHashtags ?? []
    setTagList(cacheTagList.current)
  }, [agentProduct?.recommendHashtags])

  return {
    agentList,
    loading,
    reLoading,
    sortOptions,
    sort,
    hasMoreData,
    showRecommendTag,
    cacheTagList: cacheTagList.current,
    tagList,
    activeTag,
    search,
    handleCardScroll,
    handleSortChange,
    handleTagChange,
    handleCloseTag,
    onSearch,
    handleSearchChange,
    handleClickEmptyTag,
  }
}
