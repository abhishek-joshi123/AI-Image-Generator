"use client";
import Search from "@/Components/Search";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect, useState } from "react";

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Home() {
  const host = process.env.NEXT_PUBLIC_LOCAL_HOST;
  interface IMAGE {
    _id: string;
    featured: boolean;
    photo: string;
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
        const modifiedImages = json?.data.map((image: any, index: number) => {
          if (index % 5 === 0) {
            return { ...image, featured: true };
          }
          return image;
        });
        setImages(modifiedImages);
      } else console.error(`error = ${json?.msg}`);
    } catch (error: any) {
      console.error(`Internal server error: ${error.message}`);
    }
  };

  useEffect(() => {
    GetAllImages();
  }, []);

  return (
    <main>
      <Search />
      <div className="flex justify-center items-center p-4">
        <ImageList
          sx={{
            width: '60%',
            transform: "translateZ(0)",
            '@media (max-width: 768px)': {
              width: '80%',
            },
          }}
          rowHeight={200}
          gap={1}
        >
          {Images?.map((item) => {
            const cols: number = item.featured ? 2 : 1;
            const rows: number = item.featured ? 2 : 1;

            return (
              <ImageListItem key={item._id} cols={cols} rows={rows}>
                <img
                  {...srcset(item.photo, 250, 200, rows, cols)}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={item.name}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${item.name}`}
                    >
                    <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </main>
  );
}
