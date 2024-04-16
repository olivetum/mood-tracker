'use client'
import {createNewEntry} from "@/utils/api";
import {useRouter} from "next/navigation";

const NewEntryCard = () => {
    const router = useRouter()
    const handleOnClick = async () => {
        console.log('On click')
        const data = await createNewEntry();
        router.push(`/journal/${data.id}`)
    }

    return (
        <div
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
            onClick={handleOnClick}
        >
            <div className="px-4 py-5 sm:p-6">
                <span className="text-2xl">New entry</span>
            </div>

        </div>
    )
}

export default NewEntryCard
