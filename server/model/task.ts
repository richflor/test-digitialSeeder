import { z } from "zod";

export const ITaskSchema = z.object({
    id: z.number().int(),
    title: z.string().max(256),
    done: z.boolean(),
})

export const ITaskCreateSchema = z.object({
    title: z.string().max(256),
})

export type ITask = z.infer<typeof ITaskSchema>;

export type ITaskRO = Readonly<ITask>;

export type ITaskCreate = z.infer<typeof ITaskCreateSchema>

export type ITaskUpdate = Partial<ITaskCreate>;