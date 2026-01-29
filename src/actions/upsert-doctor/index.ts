"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    // 1. Destruturamos para separar o que vamos transformar do que vai direto pro banco
    const { id, availableFromTime, availableToTime, ...rest } = parsedInput;

    // 2. Parse seguro das horas (adicionando "00" caso não venha segundos)
    const parseTime = (timeStr: string) => {
      const [h, m, s = "00"] = timeStr.split(":");
      return dayjs()
        .set("hour", parseInt(h))
        .set("minute", parseInt(m))
        .set("second", parseInt(s))
        .utc();
    };

    const fromUTC = parseTime(availableFromTime);
    const toUTC = parseTime(availableToTime);

    // 3. Validação de Sessão
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.clinic?.id) {
      throw new Error("Usuário não autorizado ou clínica não encontrada");
    }

    // 4. Montamos o objeto de dados final
    // Importante: Só incluímos o ID se ele realmente existir (para o Upsert funcionar)
    const dataToSave = {
      ...rest,
      clinicId: session.user.clinic.id,
      availableFromTime: fromUTC.format("HH:mm:ss"),
      availableToTime: toUTC.format("HH:mm:ss"),
      ...(id && { id }), // Só adiciona a chave 'id' se ela não for undefined/null
    };

    try {
      await db
        .insert(doctorsTable)
        .values(dataToSave)
        .onConflictDoUpdate({
          target: [doctorsTable.id],
          set: dataToSave,
        });

      revalidatePath("/doctors");
      return { success: true };
    } catch (error) {
      console.error("Erro no Banco de Dados:", error);
      throw new Error("Falha ao salvar no banco de dados");
    }
  });
