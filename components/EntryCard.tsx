// @ts-ignore
const EntryCard = ({entry}) => {
    const date = new Date(entry.createdAt).toDateString();
    console.log(entry)
    return (
    <div
        className="flex flex-col gap-4 px-4 py-6 ring-1 ring-violet-300 overflow-hidden rounded-lg bg-white/30 shadow">
        <div className="text-sm">{date}</div>
        <div className="text-xl font-medium h-[3rem]">{entry.analysis.summary}</div>
        <div className="flex items-center">
            <p className="px-2 py-1 rounded-lg w-auto capitalize">{entry.analysis.mood}</p>
            <div className="h-2 w-2 rounded-[50%]" style={{backgroundColor: entry.analysis.color}}></div>
        </div>
    </div>
    )
}

export default EntryCard