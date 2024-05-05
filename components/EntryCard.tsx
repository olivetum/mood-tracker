// @ts-ignore
const EntryCard = ({entry}) => {
    const date = new Date(entry.createdAt).toDateString();
    console.log(entry)
    return (
    <div
        className=" flex flex-col gap-4 px-4 py-6 overflow-hidden rounded-lg bg-white/30 shadow">
        <div className="text-sm">{date}</div>
        <div className="text-xl font-medium">{entry.content}</div>
        <div className="">Mood</div>
    </div>
    )
}

export default EntryCard