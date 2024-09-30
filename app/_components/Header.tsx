"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();
  const MenuList = [
    { name: "Home", href: "/" },
    { name: "Create Story", href: "/create-story" },
    { name: "Explore Story", href: "/explore" },
    { name: "Contact", href: "/contact-us" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle the opening and closing of the menu
  const handleNavToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen} // Tracks the menu state
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen} // Updates the menu state
    >
      {/* Left Side Content */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={handleNavToggle} // Add onClick here to toggle menu
        />
        <NavbarBrand>
          <Link className='flex flex-row gap-2 justify-center items-center' href="/" onClick={() => setIsMenuOpen(false)}>
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            <h1 className="ml-2 text-[#5253A3] lg:text-3xl hidden md:flex text-lg font-bold">
              <span className="text-green-700 lg:text-3xl text-xl mr-2">Story </span>
              Yetu
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center Content */}
      <NavbarContent justify="center" className="hidden md:flex justify-center">
        {MenuList.map((item, index) => (
          <NavbarItem
            key={index}
            onClick={() => setIsMenuOpen(false)} // Close menu on item click
            className="text-xl text-primary font-medium hover:underline ml-2"
          >
            <Link href={item.href}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side Content */}
      <NavbarContent justify="end">
        <Link href="/dashboard">
          <Button color="primary">
            {isSignedIn ? "Dashboard" : "Get started"}
          </Button>
        </Link>
        <UserButton />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {MenuList.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
