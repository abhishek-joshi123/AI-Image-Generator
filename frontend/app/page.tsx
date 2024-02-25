"use client";
import { useEffect, useState } from "react";
import Search from "@/Components/Search";
import Image from "next/image";
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export default function Home() {
  const host = process.env.NEXT_PUBLIC_LOCAL_HOST;
  interface IMAGE {
    _id: string;
    photo: string;
    prompt: string;
    name: string;
  }

  const [Images, setImages] = useState<IMAGE[]>([]);

  const GetAllImages = async () => {
    try {
      const response = await fetch(`${host}/post/allPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (json?.success) {
        setImages(json?.data);
      } else {
        console.error(`error = ${json?.msg}`);
      }
    } catch (error: any) {
      console.error(`Internal server error: ${error.message}`);
    }
  };

  useEffect(() => {
    GetAllImages();
  }, []);

  

  return (
    <main className="pt-24">
      <Search setImages={setImages} />
      <div className="flex justify-center items-center p-4">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-flow-dense h-screen overflow-scroll">
          {Images?.map((item) => (
            <div key={item._id} className="relative group cursor-pointer">
              <Image
                src={item?.photo}
                alt={item?.name}
                width={300}
                height={300}
                className="object-cover rounded-md transition transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50">
                <p className="text-white text-lg">{item?.prompt}</p>
              </div>
              <div className="absolute text-white top-1 left-2 font-semibold flex justify-center items-center">
                  <StarOutlineIcon/>
                  <p className="ml-1">{item?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
