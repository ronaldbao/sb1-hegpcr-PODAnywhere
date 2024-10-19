"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

const products = [
  {
    id: "PROD001",
    name: "Acrylic Puzzle Plaque",
    vendor: "ShineOn",
    price: 15.77,
    stock: 50,
  },
  {
    id: "PROD002",
    name: "Graphic Heart Keychain",
    vendor: "ShineOn",
    price: 11.00,
    stock: 100,
  },
  {
    id: "PROD003",
    name: "Graphic Journal",
    vendor: "ShineOn",
    price: 17.00,
    stock: 75,
  },
  {
    id: "PROD004",
    name: "Dog Tag Necklace with Engraving",
    vendor: "ShineOn",
    price: 13.00,
    stock: 60,
  },
]

export default function ProductsPage() {
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const sortProducts = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortColumn === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
    if (sortColumn === "vendor") {
      return sortDirection === "asc" ? a.vendor.localeCompare(b.vendor) : b.vendor.localeCompare(a.vendor)
    }
    if (sortColumn === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price
    }
    if (sortColumn === "stock") {
      return sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock
    }
    return 0
  })

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search products..."
              className="w-[150px] sm:w-[250px]"
            />
            <Button>Add Product</Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortProducts("name")}>
                  Name {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortProducts("vendor")}>
                  Vendor {sortColumn === "vendor" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => sortProducts("price")}>
                  Price {sortColumn === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => sortProducts("stock")}>
                  Stock {sortColumn === "stock" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.vendor}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}