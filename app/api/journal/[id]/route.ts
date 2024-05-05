import {getUserByClerkID} from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import entry from "next/dist/server/typescript/rules/entry";
import {updateEntry} from "@/utils/api";
import {analyze} from "@/utils/ai";
import {revalidatePath} from "next/cache";

// @ts-ignore
export const PATCH = async (request: Request, {params}) => {
    const { content } = await request.json();
    const user = await getUserByClerkID();
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            entryID: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        },
    });

    const analysis =await analyze(updatedEntry.content)
    const update = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        // @ts-ignore
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
        // @ts-ignore
        update: analysis,
    })


    return NextResponse.json({ data: {...updatedEntry, analysis}});
}