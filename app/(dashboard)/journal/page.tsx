import { prisma} from "@/utils/db";
import {getUserByClerkID} from "@/utils/auth";
import {isErrored} from "node:stream";
import NewEntryCard from "@/components/NewEntryCard";
import entry from "next/dist/server/typescript/rules/entry";
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import {analyze} from "@/utils/ai";
import Question from "@/components/Question";

const getEntries = async () => {
    const user = await  getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    await analyze('It was a bad day.')
    return entries;
}
const JournalPage = async () => {
    const entries = await getEntries();
    return (
        <div className="p-10 ">
            <h2 className="text-2xl mb-8">Journal</h2>
            <Question/>
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