"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Search, Menu, X, Sun, Moon, Plus, PenSquare, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession, signOut } from "next-auth/react"

const categories = [
  { name: "Hardware", href: "/category/hardware" },
  { name: "Software", href: "/category/software" },
  { name: "Electronics", href: "/category/electronics" },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl">RoboDev</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 ml-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:px-6">
            <div className="w-full max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 w-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
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
              </DropdownMenuContent>
            </DropdownMenu>

            {session ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/articles/create" className="flex items-center w-full">
                        <PenSquare className="mr-2 h-4 w-4" />
                        記事作成
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/cad-models/create" className="flex items-center w-full">
                        <FileUp className="mr-2 h-4 w-4" />
                        CADモデルアップロード
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link href="/api/auth/signin">
                  ログイン
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link href="/" className="font-bold text-xl">
                      RoboDev
                    </Link>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Search articles..."
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Categories</p>
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block text-sm font-medium"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    {session ? (
                      <>
                        <Button variant="ghost" asChild className="w-full justify-start">
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="w-full">
                              <Plus className="mr-2 h-4 w-4" />
                              New
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Link href="/articles/create" className="flex items-center w-full">
                                <PenSquare className="mr-2 h-4 w-4" />
                                記事作成
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/cad-models/create" className="flex items-center w-full">
                                <FileUp className="mr-2 h-4 w-4" />
                                CADモデルアップロード
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => signOut()}
                        >
                          Log out
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/api/auth/signin">
                          ログイン
                        </Link>
                      </Button>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">© 2025 RoboDev</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}