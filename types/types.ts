export interface Product {
    id: string
    title: string
    price: number
    description: string
    condition: string
    category: string
    owner: {
      username: string
      email: string
      phone: string
    },
    phone : string
    location: string
    postedDate: string
    views: number
    isAuction: boolean
    currentBid: number
    bidCount: number
    endTime: string
    images: string[]
    contactMethod: "phone" | "email" | "both"
    meetingLocation: string;
    createdAt : Date
  }