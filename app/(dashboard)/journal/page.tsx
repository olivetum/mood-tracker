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
        include: {
            analysis: true,
        }
    })
    await analyze('')
    return entries;
}
const JournalPage = async () => {
    const entries = await getEntries();
    return (
        <div className="md:p-10 mt-12 md:mt-0 pb-12">
            <h2 className="text-2xl mb-8">Journal</h2>
            <Question/>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
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