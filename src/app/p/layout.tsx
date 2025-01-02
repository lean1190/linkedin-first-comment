import Nav from './components/nav';

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Nav />
            <main>{children}</main>
        </>
    );
}
