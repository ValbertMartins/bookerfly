import BookList from "@/components/bookList"
import Statistics from "@/components/statistics"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { MdSearch } from "react-icons/md"

interface Props {
  bookList: Book[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient()

  let bookList = await prisma.book.findMany()

  bookList = JSON.parse(JSON.stringify(bookList))
  return {
    props: {
      bookList,
    },
  }
}

export default function Home({
  bookList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className="bg-primary-color p-8">
      <header className="flex items-center justify-between">
        <div className="text-2xl font-bold">Biblioteca</div>

        <div className="flex items-center bg-white pl-3 rounded-lg py-1">
          <MdSearch
            size={22}
            color="#a1a1aa"
          />
          <input
            type="text"
            placeholder="Search book here"
            className=" py-1 px-3 outline-none border-none placeholder:text-sm"
          />
        </div>
      </header>

      <Statistics />
      <BookList bookList={bookList} />
    </section>
  )
}
