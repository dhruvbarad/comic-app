// app/layout.js
export const metadata = {
    title: 'My Next.js App',
    description: 'A Next.js app with a persistent header and footer',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className="layout">
            <header>
                <h1>Header</h1>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <p>Footer</p>
            </footer>
        </div>
        </body>
        </html>
    );
}
