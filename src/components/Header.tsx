'use client';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { parseFullName } from "parse-full-name";
import Image from 'next/image';


export default function Header({session}:{session:Session|null}) {
    const name = session?.user?.name || '';
    const {last:firstName} = parseFullName(name);

    return (
        <>
        <header className="mb-16">
        <div className="flex justify-between max-w-2xl mx-auto px-4 py-4">
            <Link href={'/'} className="inline-flex gap-1 items-center">
                <FontAwesomeIcon className="h-8" icon={faWineGlass} />
                <span className="mt-1">Buy Me Boba</span>
            </Link>
            <nav className="mt-1 flex gap-6 items-center">
                <Link href="/about" className="">About</Link>
                <Link href="/about" className="">FAQ</Link>
                <Link href="/about" className="">Contact</Link>
                <div className="flex gap-4">
                    {session && (
                        <div className="">
                            <Link
                                href={"/profile"}
                                className="flex items-center gap-2 bg-blue-300 pl-2 pr-4 p-1 rounded-full"
                            >
                                <Image src={session.user?.image as string} 
                                    alt="avatar" 
                                    width={36} height={36}
                                    className="rounded-full" />
                        {firstName}
                            </Link>
                        </div>
                    )}
                    {!session && (
                        <>
                            <button 
                                onClick={() => signIn('google')}
                                className="border-2 px-4 py-2 rounded-full ml-4"
                            >
                                Login
                            </button>
                            <button className="bg-blue-300 px-4 py-2 rounded-full">
                                Sign Up
                            </button>
                        </>
                    )}

                </div>
            </nav>
        </div>
        </header>
        </>
    );
}

