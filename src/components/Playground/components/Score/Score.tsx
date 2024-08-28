// import styles from "./Score.module.css"

import { useAppSelector } from "../../../../app/hooks"

const Score: React.FC = () => {
  const state = useAppSelector((state) => state.playground)
  return (
    <>
      <span>Errors {state.totalUnSuccessful}</span>
      <br />
      <span>Successful {state.totalSuccessful}</span>
    </>
  )
}

export default Score
