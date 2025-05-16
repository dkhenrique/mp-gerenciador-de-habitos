
import ArrowIcon from "@/components/arrowIcon";
import Calendar from "@/components/calendar";
import { redis } from "@/lib/redis";
import Link from "next/link";

export default async function Habit({ params: { habit } }: { params: { habit: string } }) {
  const decodedHabit = decodeURI(habit);
  const habitStreak: Record<string, boolean> | null = await redis.hget('habits', decodedHabit)
  

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16 pb-16">
      <h1 className="text-4xl font-light text-center font-display text-white">
        {decodedHabit}
      </h1>

      <Link href={'/'} className="flex items-center gap-1 text-xs text-neutral-300 font-sans">
        <ArrowIcon width={12} height={12}/>
        Voltar
      </Link>

      
      <Calendar habit={decodedHabit} habitStreak={habitStreak} />
      

    </main>
  )
}
