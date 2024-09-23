'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';
function Header() {
  const {user, isSignedIn} = useUser()
    const MenuList = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Create Story",
            href: "/create-story",
        },
        {
            name: "Explore story",
            href: "/explore",
        },
        {
            name: "contact",
            href: "/contact-us",}
    ]
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand>
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            <h1 className="ml-2 text-[#5253A3] lg:text-2xl text-lg font-bold">
              <span className="text-green-700 lg:text-3xl text-xl">Story</span>{" "}
              Yetu
            </h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center" className="hidden md:flex">
          {MenuList.map((item, index) => (
            <NavbarItem
              key={index}
              className="text-xl text-primary font-medium hover:underline ml-2"
            >
              <Link href={item.href}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <Link href={"/dashboard"}>
          <Button color="primary">
            {isSignedIn ? "Dashboard" : "Get started"}
            </Button>
            </Link>
          <UserButton />
        </NavbarContent>
        <NavbarMenu>
          {MenuList.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link href={item.href}>{item.name}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
}

export default Header