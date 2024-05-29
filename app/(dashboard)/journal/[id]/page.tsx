import Editor from "@/components/Editor"
import {getUserByClerkID} from "@/utils/auth";
import {prisma} from "@/utils/db";

const getEntry = async (id: any) => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            // @ts-ignore
            entryID: {
                userId: user.id,
                id,
            }
        },
        include: {
            analysis: true,
        }
    })
    return entry
}
// @ts-ignore
const EntryPage = async ({params}) => {
    const entry = await getEntry(params.id);
    // @ts-ignore

    return (
        <div className="w-full h-full">
            <div className="">
                <Editor entry={entry}/>
            </div>

        </div>
    )
}

export default EntryPage
