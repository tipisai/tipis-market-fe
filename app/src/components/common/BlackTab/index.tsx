import { getColor } from "@illa-public/color-scheme"
import { ConfigProvider, Tabs, TabsProps } from "antd"
import { FC } from "react"

const BlackTab: FC<TabsProps> = (props) => {
  const { children, ...antdTabsProps } = props
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: getColor("grayBlue", "03"),
            itemHoverColor: getColor("grayBlue", "03"),
            itemSelectedColor: getColor("grayBlue", "02"),
            inkBarColor: getColor("grayBlue", "02"),
          },
        },
      }}
    >
      <Tabs {...antdTabsProps}>{children}</Tabs>
    </ConfigProvider>
  )
}

export default BlackTab
