import { Button, ButtonProps, ConfigProvider, ThemeConfig } from "antd"
import { FC } from "react"
import BlackButtonTheme from "@/assets/theme/theme-blackButton.json"

const BlackButton: FC<ButtonProps> = (props) => {
  const { children, ...antdButtonProps } = props
  return (
    <ConfigProvider theme={BlackButtonTheme as ThemeConfig}>
      <Button {...antdButtonProps} type="primary">
        {children}
      </Button>
    </ConfigProvider>
  )
}

export default BlackButton
