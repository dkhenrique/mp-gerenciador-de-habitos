import { redis } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


function NewHabit() {
  async function newHabit(formData: FormData) {
  'use server'

    const habit = formData.get('habit')
    await redis.hset('habits', { [habit as string]: {}})

    revalidatePath('/');
    redirect('/');
  }

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      <h1 className="text-4xl font-light text-center  text-white font-display">
        Novo Hábito
      </h1>

      <form action={newHabit} className="flex flex-col gap-4 mt-4">
        <input 
        type="text" 
        name="habit"
        id="habit"
        className="p-2 font-sans text-xl text-white rounded-md bg-neutral-800 "
        />

        <button type="submit" className="font-display font-regular text-neutral-900 bg-green-500 rounded-md text-2xl p-2 mt-8">
          Cadastrar
        </button>
        <button className="text-[#F85858] bg-neutral-800 font-display text-2xl rounded-md p-2 font-regular">
          Cancelar
        </button>

      </form>
    </main>
  )
}

export default NewHabit;