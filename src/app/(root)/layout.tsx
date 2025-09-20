



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`min-h-screen max-w-7xl mx-auto`}>
            <div className="mt-12 px-5">
                {children}
            </div>
        </div>
    );
}