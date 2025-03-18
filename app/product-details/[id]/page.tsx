import { notFound } from "next/navigation";
import React from "react";
import fs from "fs";
import path from "path";
import ShoeShowCase from "@/components/ui/shoe-showcase";
import ShoeControl from "@/components/ui/shoe-control";

type Params = {
  id?: string; // Dynamic param is usually a string (or undefined)
};

interface Review {
  userName: string;
  title: string;
  comment: string;
  image: string | null;
}

interface Shoe {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: number[];
  primaryUse: string[];
  smallImage: string;
  reviews: Review[];
}
interface ProductDetailsProps {
  shoe: Shoe | null;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Get data from the file system
  const filePath = path.join(process.cwd(), "data/shoe.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const shoes: Shoe[] = JSON.parse(fileData).data;
  //   console.log(shoes.data[1]);

  // Find the shoe with the matching ID
  const shoe = shoes.find((s) => s.id === params.id);

  // Handle not found case
  if (!shoe) {
    notFound();
  }

  if (!shoe) {
    return <div className="container mx-auto p-4">Shoe not found</div>;
  }

  return (
    <section className="flex flex-col h-screen">
      {/* 3d Model here */}
      <ShoeShowCase />

      {/* Content */}
      <ShoeControl shoe={shoe} />
    </section>
  );
}
