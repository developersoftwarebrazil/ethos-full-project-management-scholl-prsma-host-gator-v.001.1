"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { createLesson, updateLesson } from "@/lib/actions";
import { Dispatch, SetStateAction } from "react";

interface LessonFormProps {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: any;
  relatedData?: {
    subjects: any[];
    teachers: any[];
    grades: any[];
    classes: any[];
  };
}

interface LessonFormData {
  id?: number;
  name: string;
  subjectId: number;
  teacherId: string;
  gradeId: number;
  classId: number;
  day: string;
  startTime: string;
  endTime: string;
}

export default function LessonForm({
  type,
  setOpen,
  data,
  relatedData,
}: LessonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    defaultValues: data || {},
  });

  const onSubmit: SubmitHandler<LessonFormData> = async (formData) => {
    try {
      if (type === "create") {
        await createLesson(formData);
        toast.success("Turma criada com sucesso!");
      } else {
        await updateLesson(formData);
        toast.success("Turma atualizada com sucesso!");
      }
      setOpen(false);
    } catch (err) {
      toast.error("Erro ao salvar aula!");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-full"
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Criar nova aula" : "Atualizar aula"}
      </h1>

      <div className="flex flex-wrap justify-between gap-4">
        {/* Nome */}
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Nome da Turma</label>
          <input
            {...register("name", { required: "Campo obrigatório" })}
            defaultValue={data?.name}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.name && (
            <span className="text-xs text-red-400">{errors.name.message}</span>
          )}
        </div>

        {/* Disciplina */}
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Disciplina</label>
          <select
            {...register("subjectId", { required: true })}
            defaultValue={data?.subjectId || ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Selecione...</option>
            {relatedData?.subjects?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.subjectId && (
            <span className="text-xs text-red-400">Campo obrigatório</span>
          )}
        </div>

        {/* Professor */}
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Professor</label>
          <select
            {...register("teacherId", { required: true })}
            defaultValue={data?.teacherId || ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Selecione...</option>
            {relatedData?.teachers?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.teacherId && (
            <span className="text-xs text-red-400">Campo obrigatório</span>
          )}
        </div>

        {/* Turma */}
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Turma</label>
          <select
            {...register("classId", { required: true })}
            defaultValue={data?.classId || ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Selecione...</option>
            {relatedData?.classes?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.classId && (
            <span className="text-xs text-red-400">Campo obrigatório</span>
          )}
        </div>

        {/* Série */}
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Série</label>
          <select
            {...register("gradeId", { required: true })}
            defaultValue={data?.gradeId || ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Selecione...</option>
            {relatedData?.grades?.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.gradeId && (
            <span className="text-xs text-red-400">Campo obrigatório</span>
          )}
        </div>

        {/* Dia da semana */}
        <div className="flex flex-col gap-2 w-full md:w-[30%]">
          <label className="text-xs text-gray-500">Dia da Semana</label>
          <input
            {...register("day", { required: "Campo obrigatório" })}
            defaultValue={data?.day}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.day && (
            <span className="text-xs text-red-400">{errors.day.message}</span>
          )}
        </div>

        {/* Horário de início */}
        <div className="flex flex-col gap-2 w-full md:w-[30%]">
          <label className="text-xs text-gray-500">Início</label>
          <input
            type="time"
            {...register("startTime", { required: true })}
            defaultValue={data?.startTime}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.startTime && (
            <span className="text-xs text-red-400">Campo obrigatório</span>
          )}
        </div>

        {/* Horário de término */}
        <div className="flex flex-col gap-2 w-full md:w-[30%]">
          <label className="text-xs text-gray-500">Término</label>
          <input
            type="time"
            {...register("endTime", { required: true })}
            defaultValue={data?.endTime}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.endTime && (
            <span className="text-xs text-red-400">Campo obrigatório</span>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {type === "create" ? "Criar" : "Atualizar"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
