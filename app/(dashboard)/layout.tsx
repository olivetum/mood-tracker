import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

// @ts-ignore
const DashboardLayout = ({children})  => {
const {userId} = auth();
let href = userId ? '/journal' : '/new-user';
// @ts-ignore
const links = [
    userId ? {href: "/journal", label: 'Home'} : {href: "/", label: 'Home'},
    {href: "/journal", label: 'Journal'},
    {href: "/history", label: 'History'},
]
    return (
        <div className="h-screen w-screen relative bg-gradient-to-t from-blue-300 to-violet-100">
            <aside className="absolute w-[200px] top-0 left-0 h-full px-8 pt-24 bg bg-white/20">
                <Link href={links[0]}>
                    <p className="font-bold text-transparent bg-gradient-to-br from-violet-500 to-blue-600 bg-clip-text text-xl">MOOD</p>
                </Link>

                <ul className="mt-4 flex flex-col gap-2">
                    {links.slice(1).map((link => (
                    <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>)))}</ul>
            </aside>
            <div className="ml-[200px]">
                <header className="h-[60px]">
                    <div className="flex h-full w-full px-6 items-center justify-end">
                        <UserButton/>
                    </div>
                </header>
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    )
}
export default DashboardLayout