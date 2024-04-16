import {auth} from "@clerk/nextjs";
import {prisma} from "@/utils/db";

// @ts-ignore
export const getUserByClerkID = async () => {
    const {userId} = await auth();
    // @ts-ignore
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            // @ts-ignore
            clerkId: userId,
        }
    })
    return user
}