export default function Home() {
    return (
        <div className="mt-16 flex flex-col items-center justify-center">
            <div
                className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"/>
            <h1 className="text-3xl text-transparent duration-500 bg-white font-display bg-clip-text animate-title">
                Hello! I&#39;m Dhruv
            </h1>
            <div
                className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"/>
        </div>
    );
}
