"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios from "axios"

import { BACKEND_URL } from "@/config/config"
import Link from "next/link"
import { Upload, X, Check, Info, Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export interface Product {
  title: string
  price: number
  description: string
  condition: string
  category: string
  phone: string
  images: string[]
  contactMethod: string
  meetingLocation: string
  saletype: string
  email: string
}

export default function UpdateProductForm({ product: existingProduct, id }: { product: Product, id: string }) {
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [listingType, setListingType] = useState("fixed")

  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    category: "",
    price: 0,
    condition: "",
    saletype: "fixed price",
    contactMethod: "phone",
    phone: "",
    meetingLocation: "",
    email: "",
    images: [""]
  })

  useEffect(() => {
    if (existingProduct) {
      setProduct(() => ({ ...existingProduct }));
    }
    console.log("ext ", existingProduct);
  }, [existingProduct]);
  
  useEffect(() => {
    console.log("Product updated:", product);
  }, [product]);
  

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    setIsValidating(true)
    let toastId: string | number = ""

    try {
      toastId = toast.loading("Updating Product...")

      const response = await axios.put(`${BACKEND_URL}/api/product/${id}`, product, {
        withCredentials: true,
      })

      if (response.data?.success) {
        setSubmitted(true)
        router.push("/dashboard")
      }
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        const err = error as any
        if (err.response) {
          setValidationError(err.response.data?.message)
        } else {
          setValidationError("An unexpected error occurred. Please try again.")
        }
      } else {
        console.error("Error submitting form:", error)
        setValidationError("Failed to submit listing. Please try again.")
      }
    } finally {
      toast.dismiss(toastId)
      setIsValidating(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sell Your Item</h1>
            <p className="text-muted-foreground">Fill out the form below to list your item for sale or auction.</p>
          </div>

          {submitted && (
            <Alert className="mb-8 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Your listing has been submitted successfully! We'll review it shortly.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Calculus Textbook 3rd Edition"
                      value={product.title}
                      onChange={(e) => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your item's condition, features, and any other relevant details..."
                      className="min-h-[120px]"
                      value={product.description}
                      onChange={(e) => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2 bg-white">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        required
                        value={product.category}
                        onValueChange={(value) => setProduct(p => ({ ...p, category: value }))}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="books">Books & Notes</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="cycles">Cycles</SelectItem>
                          <SelectItem value="hostel">Hostel Essentials</SelectItem>
                          <SelectItem value="projects">Project Kits</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        required
                        value={product.condition}
                        onValueChange={(value) => setProduct(p => ({ ...p, condition: value }))}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="like new">Like New</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Listing Details</h2>
                <div className="space-y-6">
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        value={product.price}
                        onChange={(e) => setProduct(p => ({ ...p, price: parseInt(e.target.value) }))}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="meetingLocation">Meeting Location</Label>
                      <Input
                        id="meetingLocation"
                        name="meetingLocation"
                        placeholder="e.g., Hostel C Block"
                        value={product.meetingLocation}
                        onChange={(e) => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={product.phone}
                        onChange={(e) => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={product.email}
                        onChange={(e) => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {validationError && (
              <p className="text-red-500 text-sm">{validationError}</p>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isValidating}>
                {isValidating ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Update Product"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
