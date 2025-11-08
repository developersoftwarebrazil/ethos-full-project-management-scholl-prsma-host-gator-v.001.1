"use client";

import { useFormState } from "react-dom";
import { createGrade } from "@/lib/actions";

export default function GradeForm({ type, data, setOpen }: any) {
  const [state, formAction] = useFormState(
    async (
      prevState: { success: boolean; error: boolean },
      formData: FormData
    ) => {
      const description = formData.get("description") as string;
      const level = Number(formData.get("level"));
      const res = await createGrade({ description, level });
      return res;
    },
    { success: false, error: false }
  );

  return (
    <form action={formAction}>
      {/* Campos */}
      <input
        type="text"
        name="description"
        placeholder="Descrição"
        defaultValue={data?.description || ""}
      />
      <input
        type="number"
        name="level"
        placeholder="Nível"
        defaultValue={data?.level || ""}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
