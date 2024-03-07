export const EMAIL_FORMAT =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const DOMAIN_FORMAT = /^[a-zA-Z0-9]{0,1}[a-zA-Z0-9_]*[a-zA-Z0-9]$/

export const HOST_NAME_FORMAT =
  /^([a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})$/

export const MOBILE_USER_AGENT = /Android|webOS|iPhone|iPod|BlackBerry/i
