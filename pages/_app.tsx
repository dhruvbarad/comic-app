import type {AppProps} from 'next/app'
import "../app/globals.css"
import {Navigation} from "@/app/Navbar";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Navigation/>
            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}
