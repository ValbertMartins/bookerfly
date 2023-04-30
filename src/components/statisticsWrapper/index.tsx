import { getStatistics } from "@/utils/handlerStatistics"
import React, { useEffect, useState } from "react"
import { MdMenuBook, MdPerson, MdBook } from "react-icons/md"

interface Props {
  updateStatistics: boolean
}

const StatisticsWrapper = ({ updateStatistics }: Props) => {
  const [registeredStudentsCounter, setRegisteredStudentsCounter] = useState(0)
  const [registeredBooksCounter, setRegisteredBooksCounter] = useState(0)
  const [booksBorrowedCounter, setBooksBorrowedCounter] = useState(0)

  useEffect(() => {
    async function handlerStatistics() {
      const { ok, data } = await getStatistics()

      if (ok && data) {
        setRegisteredStudentsCounter(data.registeredStudentsCounter)
        setRegisteredBooksCounter(data.registeredBooksCounter)
        setBooksBorrowedCounter(data.booksBorrowedCounter)
      }
    }

    handlerStatistics()
  }, [updateStatistics])

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 my-10 gap-6 ">
      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-cyan-500 rounded-full p-3 mx-2">
          <MdPerson
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">{registeredStudentsCounter}</p>
          <p className="text-xs text-slate-400">Alunos cadastrados</p>
        </div>
      </div>

      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-orange-400 rounded-full p-3 mx-2">
          <MdMenuBook
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">{registeredBooksCounter}</p>
          <p className="text-xs text-slate-400">Livros cadastrados</p>
        </div>
      </div>

      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-lime-500 rounded-full p-3 mx-2">
          <MdBook
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">{booksBorrowedCounter}</p>
          <p className="text-xs text-slate-400">Livros emprestados</p>
        </div>
      </div>
    </section>
  )
}

export default StatisticsWrapper