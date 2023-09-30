"use client";
import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";

const LoginForm = () => {
    const {data: session} = useSession();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {console.log(session?.user.image)}
            {session && (
                <>
                    <Image src={session.user.image} alt="img" width={50} height={50}/>
                    <p>{session.user.name}</p>
                    <p>{session.user.email}</p>
                </>
            )}
            {!session && (
                <button
                    onClick={() => signIn()}
                    className="p-2 my-2 bg-blue-500 text-white"
                >
                    Signin with google
                </button>
            )}
            {session && (
                <button
                    onClick={() => signOut()}
                    className="p-2 bg-blue-500 my-2 text-white"
                >
                    Sign out
                </button>
            )}
        </div>
    );
};

export default LoginForm;