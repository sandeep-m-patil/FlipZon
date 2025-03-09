"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Home, Search, Sun, Moon, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const routes = [
    {
      href: "/products",
      label: "Products",
      icon: Home,
      active: pathname === "/products"
    },
    {
      href: "/cart",
      label: "Cart",
      icon: ShoppingCart,
      active: pathname === "/cart"
    },
    
  ]

  return (
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2 p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[200px] sm:w-[400px] bg-background/90 p-6">
            <nav className="flex flex-col gap-9 py-12">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-4 text-lg font-semibold transition-colors",
                    route.active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
            
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className=" font-bold sm:inline-block text-xl text-primary">FlipZon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center ml-auto space-x-10 text-sm font-medium">
          
  
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 transition-colors hover:text-foreground/80",
                route.active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}

        </nav>
     

        {/* Search and Theme Toggle */}
        <div className="flex items-center space-x-4 mx-5">
             {/* Theme Toggle */}
             <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
<div className="h-17 w-10 p-5 "><UserButton /></div>
          
       
        </div>
      </div>
    </nav>
  )
}
