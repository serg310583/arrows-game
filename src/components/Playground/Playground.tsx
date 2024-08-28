import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Controls from "./components/Controls"
import KeyPressed from "./components/KeyPressed"
import Modal from "./components/Modal"
import RandomKeys from "./components/RandomKeys"
import Score from "./components/Score"
import { END_GAME_CONDITION, INTERVAL_TIME } from "./constants"
import { setCurrentStep, setSteps, setUnSuccess } from "./store/slices"

const Playground: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isSuccessEndGame, setIsSuccessEndGame] = useState<boolean>(false)

  const refreshIntervalID = useRef<ReturnType<typeof setInterval> | null>(null)
  const state = useAppSelector((state) => state.playground)
  useEffect(() => {
    if (isTimerActive) {
      refreshIntervalID.current = setInterval(() => {
        dispatch(setUnSuccess())
        dispatch(setCurrentStep())
        dispatch(setSteps())
      }, INTERVAL_TIME)
    } else {
      clearInterval(refreshIntervalID.current as NodeJS.Timeout)
    }
    return () => {
      clearInterval(refreshIntervalID.current as NodeJS.Timeout)
    }
  }, [isTimerActive, dispatch])

  useEffect(() => {
    const isSuccessful =
      state.totalSuccessful === END_GAME_CONDITION.SUCCESS_COUNT
    const isUnSuccessful =
      state.totalUnSuccessful === END_GAME_CONDITION.UNSUCCESS_COUNT

    isSuccessful && setIsSuccessEndGame(true)
    isUnSuccessful && setIsSuccessEndGame(false)

    if (isSuccessful || isUnSuccessful) {
      setIsShowModal(true)
      setIsTimerActive(false)
    }
  }, [state.totalSuccessful, state.totalUnSuccessful])

  return (
    <div>
      {state.currentStep}
      <Controls
        isTimerActive={isTimerActive}
        setIsTimerActive={setIsTimerActive}
      />
      <RandomKeys isTimerActive={isTimerActive} />
      <KeyPressed isTimerActive={isTimerActive} />
      <Score />
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          isSuccessEndGame={isSuccessEndGame}
        />
      )}
    </div>
  )
}
export default Playground
