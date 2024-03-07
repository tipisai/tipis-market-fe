import {
  ILLAMixpanel,
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_PAGE_NAME,
} from "@illa-public/mixpanel-utils"

export const track = (
  event: ILLA_MIXPANEL_EVENT_TYPE,
  pageName: ILLA_PAGE_NAME,
  properties: Omit<ILLAProperties, "page"> = {},
) => {
  const currentProperties = {
    ...properties,
    ...{ team_id: properties.team_id || "-1" },
  }
  ILLAMixpanel.track(event, {
    ...currentProperties,
    page: pageName,
  })
}

export const trackPageDurationStart = () => {
  ILLAMixpanel.pageTimeEvent()
}

export const trackPageDurationEnd = (pageName: ILLA_PAGE_NAME) => {
  ILLAMixpanel.trackTimeEvent(pageName, "-1")
}
