'use server'

import { redis } from '@/lib/redis';
import { revalidatePath } from 'next/cache';


export async function deleteHabit(habit: string) {
  await redis.hdel('habits', habit);
  revalidatePath('/');
}

type ToggleHabitParams = {
  habit: string;
  habitStreak: Record<string, boolean> | null;
  date: string | null;
  done?: boolean;
}

export async function toggleHabit({
  habit,
  habitStreak,
  date,
  done,
}: ToggleHabitParams) {
  if (!habitStreak || !date) {
    return;
  }

  const updatedHabitStreak = {
    [habit]: {
      ...habitStreak,
      [date]: done === undefined ? true : !done,
    }
  }

  await redis.hset('habits', updatedHabitStreak)
  revalidatePath('/')
}

