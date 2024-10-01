"use client"
import axios from "axios";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { siteConfig } from "@/config/site"; // Adjust the path as necessary
import { usePathname } from 'next/navigation'; // Import from next/navigation
import { useState } from "react";

import { useRouter } from "next/navigation";
export default function Navibar() {
  const router = useRouter();
  
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      alert("Logout successful");
      router.push("/login");
    } catch (error) {
      alert(error)
    }
  };
  

  const pathname = usePathname(); // Use usePathname instead of useRouter
 
  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        {/* Replace with your logo or icon */}
        <p className="font-bold text-inherit">Next Bank</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navMenuItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link href={item.href} color="foreground" aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={logout} color="primary" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
