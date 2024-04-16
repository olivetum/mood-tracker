import {getUserByClerkID} from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export const POST = async () => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day',
        }
    });
    console.log('Revalidating path');
    revalidatePath('/journal');
    return NextResponse.json({data:entry});
}