import UpdateProductForm from "@/components/product/update/UpdateProductForm";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";

const getProductDetails = async (id: string) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/product/${id}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    const product = await getProductDetails(id);
    return (
        <>
        <UpdateProductForm product={product} id={id}/>
        </>
    )
}