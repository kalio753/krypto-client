type NavbarItemProps = {
    title: string
    classProps: string
}

export default function NavbarItem({ title, classProps }: NavbarItemProps) {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
}
