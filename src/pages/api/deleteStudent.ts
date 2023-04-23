import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function registerNewStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const studentIdSchema = z.object({
    id: z.string().nonempty(),
  })

  try {
    const { id } = studentIdSchema.parse(req.body)

    await prisma.student.delete({
      where: {
        id,
      },
    })

    let studentListUpdated = await prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
    })
    studentListUpdated = JSON.parse(JSON.stringify(studentListUpdated))
    res.revalidate("/listStudents")
    return res.status(200).json({ studentListUpdated })
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Erro ao deletar informações do estudante, tente novamente",
        status: 500,
      },
    })
  }
}
