import { css } from "@emotion/react"
import { Button } from "antd"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { FC } from "react"
import { Result500Icon, getColor } from "@illa-design/react"
import { ErrorPage } from "@/components/common/ErrorPage"

export const iconStyle = css`
  height: 96px;
  width: 96px;
  border-radius: 50px;
  background-color: ${getColor("grayBlue", "09")};
  margin-bottom: 24px;
`

export const buttonStyle = css`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`

export const Page500: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <ErrorPage
      title="500"
      des={t("status.500.des")}
      img={<Result500Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button type="primary" onClick={() => router.push("/")}>
          {t("status.back")}
        </Button>
      </div>
    </ErrorPage>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context
  const translate = await serverSideTranslations(locale as string)
  return { props: { ...translate } }
}

export default Page500
