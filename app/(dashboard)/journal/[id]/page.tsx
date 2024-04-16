import Editor from "@/components/Editor"
import {getUserByClerkID} from "@/utils/auth";
import {prisma} from "@/utils/db";
const
getEntry = async (id: any) => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            // @ts-ignore
            id
        },
    })
    return entry
}
// @ts-ignore
const EntryPage = async ({params}) => {
    const entry = await getEntry(params.id)
    return (<div>
        <Editor entry={entry}/>
    </div>
    )
}

export default EntryPage