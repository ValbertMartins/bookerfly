import RegisterBookWrapper from "@/components/registerBookWrapper"
import SearchBook from "@/components/searchBook"
import BooksTable from "@/components/table/Books"
import { Book } from "@/interfaces"
import { getBooks } from "@/utils/handlerBook"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { FormEvent, useState } from "react"
import { MdSearch } from "react-icons/md"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  try {
    const initialBookList = await prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },

      take: 10,
    })

    return {
      props: {
        initialBookList: JSON.parse(JSON.stringify(initialBookList)),
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

interface Props {
  initialBookList: Book[]
}

const ListBooks = ({ initialBookList }: Props) => {
  const [bookList, setBookList] = useState(initialBookList)
  const [loading, setLoading] = useState(false)
  const [bookNameFilter, setBookNameFilter] = useState("")
  const [page, setPage] = useState(0)

  async function handlerSearchBook(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setPage(0)

    const { ok, bookList } = await getBooks(0, bookNameFilter)
    if (ok && bookList) {
      setBookList(bookList)
    }
    setLoading(false)
  }

  return (
    <section className="p-8 flex-1 h-screen overflow-scroll">
      <div className="bg-white p-4 rounded-xl">
        <p className="text-2xl font-bold pb-5">Livros</p>

        <div className="flex items-center justify-between mt-8">
          <RegisterBookWrapper setBookList={setBookList} />

          <SearchBook
            setBookNameFilter={setBookNameFilter}
            bookNameFilter={bookNameFilter}
            setPage={setPage}
            setLoading={setLoading}
            setBookList={setBookList}
          />
        </div>

        <BooksTable
          bookList={bookList}
          setBookList={setBookList}
          setPage={setPage}
          page={page}
          bookNameFilter={bookNameFilter}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </section>
  )
}

export default ListBooks
