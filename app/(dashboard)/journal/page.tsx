import { prisma} from "@/utils/db";
import {getUserByClerkID} from "@/utils/auth";
import {isErrored} from "node:stream";
import NewEntryCard from "@/components/NewEntryCard";
import entry from "next/dist/server/typescript/rules/entry";
import EntryCard from "@/components/EntryCard";
import Link from "next/link";

const getEntries = async () => {
   // @ts-ignore
    const user = await  getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return entries;
}
const JournalPage = async () => {
    const entries = await getEntries();
    return (
        <div className="p-10 bg-zinc-400/10">
            <h2 className="text-2xl mb-8">Journal</h2>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard/>
                {entries.map(entry => (
                    <Link href={`/journal/${entry.id}`} key={entry.id}>
                        <EntryCard  entry={entry}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default JournalPage