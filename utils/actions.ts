'use server'

import { revalidatePath } from 'next/cache'

// @ts-ignore
export const update = async (paths: string[] = []) => paths.forEach((p) => revalidatePath(p))