import { Student } from "@/interfaces"
import Tooltip from "antd/lib/tooltip"

import { MdDelete, MdModeEditOutline } from "react-icons/md"
import EditStudentWrapper from "../editStudentWrapper"
import { Dispatch, SetStateAction } from "react"

interface Props {
  sourceData: Student[]
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const Table = ({ sourceData, setStudentList }: Props) => {
  return (
    <div className="border-x border-t border-zinc-100 bg-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-5  gap-[1px] bg-zinc-100">
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Nome</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Gênero</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Série</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Turma</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Ações</p>
        </div>
      </div>

      {sourceData.map(student => (
        <div
          key={student.id}
          className="grid grid-cols-5 gap-[1px] cursor-pointer bg-zinc-100 group"
        >
          <div className=" bg-white mb-[1px] group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.name}</p>
          </div>
          <div className=" bg-white mb-[1px]  group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.gender}</p>
          </div>
          <div className=" bg-white mb-[1px]  group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.grade}</p>
          </div>
          <div className=" bg-white mb-[1px]  group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.class}</p>
          </div>

          <div className=" bg-white mb-[1px] group-hover:bg-primary-color flex items-center gap-3 px-4">
            <EditStudentWrapper
              student={student}
              setStudentList={setStudentList}
            />

            <Tooltip
              title="Excluir"
              color="red"
            >
              <button>
                <MdDelete
                  size={25}
                  className="text-red-500"
                />
              </button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Table
