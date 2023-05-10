import { HiMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"

import logo from "../assets/images/logo.png"
import NavbarItem from "./NavbarItem"
import { useState } from "react"

export default function Navbar() {
    const NavbarItemList = ["Market", "Exchange", "Tutorials", "Wallet"]
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>

            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {NavbarItemList.map((ele, index) => (
                    <NavbarItem
                        key={index}
                        title={ele}
                        classProps="flex items-center"
                    />
                ))}
                <li className="bg-[#2952e3] py-1 px-4 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>

            <div className="flex relative">
                {toggleMenu ? (
                    <AiOutlineClose
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(false)}
                    />
                ) : (
                    <HiMenuAlt4
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(true)}
                    />
                )}
                {toggleMenu ? (
                    <ul className="z-10 fixed top-0 right-0 p-3 rounded-md w-[70vw] h-screen shadow-2xl md:hidden blue-glassmorphism animate-slide-in">
                        <li
                            className="text-xl my-4 text-right cursor-pointer text-red-600 pr-2"
                            onClick={() => setToggleMenu(false)}
                        >
                            X
                            {/* <AiOutlineClose
                                onClick={() => setToggleMenu(false)}
                                className="cursor-pointer text-red-600 "
                            /> */}
                        </li>
                        {NavbarItemList.map((ele, index) => (
                            <NavbarItem
                                key={index}
                                title={ele}
                                classProps="my-3 text-lg text-right text-white"
                            />
                        ))}
                    </ul>
                ) : null}
            </div>
        </nav>
    )
}
