import { useNProgress } from "@tanem/react-nprogress"
import { barStyle, containerStyle, spinnerStyle } from "./style"

const Loading: React.FC<{ isRouteChanging: boolean }> = ({
  isRouteChanging,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  })

  return (
    <div css={containerStyle(isFinished, animationDuration)}>
      <div css={barStyle(progress, animationDuration)}>
        <div css={spinnerStyle} />
      </div>
    </div>
  )
}

export default Loading
