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

const vendors = [
  {
    id: "VEND001",
    name: "ShineOn",
    products: 4,
    totalSales: 5670.00,
    status: "Active",
  },
  {
    id: "VEND002",
    name: "CustomCat",
    products: 12,
    totalSales: 8900.50,
    status: "Active",
  },
  {
    id: "VEND003",
    name: "Printify",
    products: 8,
    totalSales: 3450.75,
    status: "Inactive",
  },
  {
    id: "VEND004",
    name: "Printful",
    products: 15,
    totalSales: 12500.25,
    status: "Active",
  },
]

export default function VendorsPage() {
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const sortVendors = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedVendors = [...vendors].sort((a, b) => {
    if (sortColumn === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
    if (sortColumn === "products") {
      return sortDirection === "asc" ? a.products - b.products : b.products - a.products
    }
    if (sortColumn === "totalSales") {
      return sortDirection === "asc" ? a.totalSales - b.totalSales : b.totalSales - a.totalSales
    }
    if (sortColumn === "status") {
      return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
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
          <h2 className="text-3xl font-bold tracking-tight">Vendors</h2>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search vendors..."
              className="w-[150px] sm:w-[250px]"
            />
            <Button>Add Vendor</Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortVendors("name")}>
                  Name {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => sortVendors("products")}>
                  Products {sortColumn === "products" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => sortVendors("totalSales")}>
                  Total Sales {sortColumn === "totalSales" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortVendors("status")}>
                  Status {sortColumn === "status" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVendors.map(sortedVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell className="text-right">{vendor.products}</TableCell>
                  <TableCell className="text-right">${vendor.totalSales.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {vendor.status}
                    </span>
                  </TableCell>
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