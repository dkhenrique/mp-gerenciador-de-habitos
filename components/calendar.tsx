'use client'

import { useEffect, useState } from "react";
import ArrowIcon from "./arrowIcon";
import DayState from "./dayState";
import { toggleHabit } from "@/app/actions";


function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const firstDayWeekDay = date.getDay();
  const numberOfEmptyDays = Array(firstDayWeekDay).fill(null);
  const days = [...numberOfEmptyDays]
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];


function Calendar({
  habit,
  habitStreak,
}: {
  habit: string, 
  habitStreak: Record<string, boolean> | null
}) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(currentMonth, currentYear))
  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(month, year))
    setSelectedDay(new Date(year, month, 1))
  }, [month, year])

  function goToPreviusMonth() {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  function getFullDateString() {
    const monthName = `${selectedDay.toLocaleDateString('pt-BR' , { month: 'long' })}`
    const upperCaseMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return `${upperCaseMonthName} de ${selectedDay.getFullYear()}`
  }

  function getDayString(day: Date) {
    return `${year.toString()}-${(month + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`
  }

    
  function isFutureDay(day: Date) {
    const today = new Date();
    // Resetar hora para comparar apenas datas, sem considerar hora
    today.setHours(0, 0, 0, 0);
    day.setHours(0, 0, 0, 0);
  return day > today;
  }

  return(
    <section className="w-full my-2 rounded-md bg-neutral-800">
        <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
          <button onClick={goToPreviusMonth}>
            <ArrowIcon width={12} height={12} />
          </button>
          
          <span>{getFullDateString()}</span>

          <button onClick={goToNextMonth}>
            <ArrowIcon width={12} height={12} className="rotate-180"/>
          </button>
        </div>

        <div className="grid w-full grid-cols-7 mt-2">
          {
            weekDays.map((day) => (
              <div key={day} className="flex flex-col items-center p-2">
                <span className="text-xs font-sans font-light text-neutral-400">
                  {day}
                </span>
              </div>
            ))
          }
          {
            daysInMonth.map((day, index) => (
              day ? (
                <div key={index}
              className={`flex flex-col items-center p-2 cursor-pointer ${isFutureDay(day) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!isFutureDay(day)) {
                  toggleHabit({
                habit,
                habitStreak,
                date: getDayString(day),
                done: habitStreak ? habitStreak[getDayString(day)] : true
                })
                }}}>
                <span className="font-sans text-xs font-light text-neutral-400">
                  {day?.getDate()}
                </span>
                {day && <DayState day={habitStreak ? habitStreak[getDayString(day)]: undefined }/>}
              </div>
              ) : (<span key={index} className="text-xs font-light text-transparent select-none">0</span>)
            ))
          }
        </div>
      </section>
  )
}

export default Calendar;