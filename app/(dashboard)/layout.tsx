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
        <div className="h-screen w-screen relative bg-gradient-to-t from-blue-300 to-violet-100 px-2 md:px-0">
            <aside
                className="md:absolute md:w-[200px] md:top-0 md:left-0 md:h-full md:px-8 md:pt-24 bg md:bg-white/20">
                <div className="flex flex-cols justify-between items-center">
                    <Link href={links[0]}>
                        <p className="font-bold text-transparent bg-gradient-to-br from-violet-500 to-blue-600 bg-clip-text text-xl">MOOD</p>
                    </Link>
                    <header className="h-[60px] md:hidden">
                        <div
                            className="flex h-full w-full px-6 items-center justify-end">
                            <UserButton/>
                        </div>
                    </header>

                </div>

                <ul className="mt-4 flex md:flex-col gap-4 md:gap-2">
                    {links.slice(1).map((link => (
                        <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>)))}</ul>
            </aside>
            <div className="md:ml-[200px]">
                <header className="h-[60px] hidden">
                    <div className="flex h-full w-full md:px-6 items-center justify-end">
                        <UserButton/>
                    </div>
                </header>
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    )
}
export default DashboardLayout