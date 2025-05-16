'use client'

import { deleteHabit } from "@/app/actions"
import Image from "next/image"

function DeleteButton({ habit }: { habit: string }) {
  return (
    <button onClick={() => deleteHabit(habit)}>
      <Image 
        src={'/images/trash.svg'}
        width={20}
        height={20}
        alt="Deletar hábito"
      />
    </button>
  )
}

export default DeleteButton