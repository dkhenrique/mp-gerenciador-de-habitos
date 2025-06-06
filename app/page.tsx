import DayState from "@/components/dayState";
import Link from "next/link";
import { redis } from '@/lib/redis';
import DeleteButton from "@/components/delete-button";

export type Habits = {
    [habit: string]: Record<string, boolean> 
  } | null

export default async function Home() {

  const habits: Habits = await redis.hgetall('habits');

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const sortedWeekDays = weekDays.slice(todayWeekDay + 1).concat(weekDays.slice(0, todayWeekDay + 1))
  
  const last7Days = weekDays.map((_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - index)
    return date.toISOString().slice(0, 10)
  }).reverse()

  

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {(habits === null || Object.keys(habits).length === 0) && (
        <h1 className="mt-20 text-4xl font-light text-center text-neutral-200 font-display">
          Você não tem hábitos cadastrados
        </h1>
      )}

      {
        habits != null && Object.entries(habits).map
        (([habit, habitStreak]) => (
          <div key={habit} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-light font-sans text-white">{habit}</span>
              <DeleteButton habit={habit}/>
            </div>
            <Link href={`/habit/${habit}`}>
              <section className="grid grid-cols-7 bg-neutral-700 rounded-md p-2">
                {
                  sortedWeekDays.map((day, index) => (
                    <div key={day} className="flex flex-col last:font-bold">
                      <span  className="font-sans text-xs text-white text-center" >
                        {day}
                      </span>
                      {/**Day state */}
                      <DayState day={habitStreak[last7Days[index]]} />
                    </div>
                  ))
                }
              </section>
            </Link>
          </div>
          
        ))}

        <Link href='/new-habit' className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45EDAD] font-display font-regular text-2xl rounded-md p-2">
          Novo Hábito
        </Link>
    </main>
  );
}
