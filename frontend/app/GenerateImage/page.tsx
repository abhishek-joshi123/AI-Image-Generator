"use client";
import { GetRandoms } from "@/Prompts/prompt";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";
import Box from '@mui/material/Box';

function GenerateImage() {
  const host = process.env.NEXT_PUBLIC_LOCAL_HOST;
  const { user } = useAuth();
  const router = useRouter()

  const [name, setName] = useState<string | undefined>(user?.name);
  const [prompt, setPrompt] = useState<string>("");
  const [photo, setphoto] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [sharing, setSharing] = useState<boolean>(false);

  const GetRandomText = () => {
    const randomIndex = Math.floor(Math.random() * GetRandoms.length);
    setPrompt(GetRandoms[randomIndex]);
  };

  const HandlelGenerate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setGenerating(true)
      const response = await fetch(`${host}/dalle/generateImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      
      const json = await response.json();
      
      if (json.success) 
          setphoto(`data:image/jpeg;base64,${json.photo}`);
      else 
          toast.error(json.message);
      setGenerating(false)
    } catch (error: any) {
          toast.error(`Internal server error: ${error.message}`);
          setGenerating(false)
      }
  };

  const handleShareToAll = async(e: React.SyntheticEvent) => {
      e.preventDefault();
      if(!user) {
        return toast.error('Please login to share the image')
      }
      if(!prompt || !photo) {
        return toast.error('please generate an image with a valid prompt')
      }
      
    try {
      setSharing(true)
        const response = await fetch(`${host}/post/createPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, prompt, photo})
        })
        const json = await response.json()
        if(json.success) {
            toast.success('image shared with community')
            router.push('/')
        }
        else{
            toast.error(json.message)
        }
        setSharing(false)
      }catch (error: any) {
        toast.error(`Internal server error: ${error.message}`);
        setSharing(false)
      }
  }

  return (
    <div className="mx-auto md:px-24 px-8 py-3 font-montserrat pt-28">
      <div className="md:w-[80%] w-full">
        <h1 className="font-bold text-gray-400 drop-shadow-lg text-4xl md:text-5xl mt-5 mb-2">
          Create Post
        </h1>
        <p className="text-[#76808a] text-sm font-medium max-w-[700px] rounded-md px-3 py-1">
          All images wil be created by DALL-E AI and can be shared with All
        </p>
      </div>
      <div className="md:w-[80%] w-full">
        <h1 className="font-bold text-gray-400 drop-shadow-lg text-4xl md:text-5xl mt-5 mb-2">
          Name
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="enter your name"
          className="p-2 indent-2 outline-none border-[5px] border-gray-800 rounded-lg bg-gray-600/50 w-full text-white"
        />
      </div>
      <div className="md:w-[80%] w-full">
        <div className="mt-2 mb-2 flex justify-between items-center">
          <h1 className="font-bold text-gray-400 drop-shadow-lg text-4xl md:text-5xl">
            Prompt
          </h1>
          <button
            onClick={GetRandomText}
            className="bg-blue-400 text-gray-50 p-2 border-1 rounded font-semibold"
          >
            Get Random
          </button>
        </div>
        <input
          type="text"
          placeholder="enter any prompt"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          className="p-2 indent-2 outline-none border-[5px] border-gray-800 rounded-lg bg-gray-600/50 w-full text-white"
        />
      </div>
      <div className="md:w-[80%] w-full">
        <div className=" flex justify-center items-center p-4">
          <button
            onClick={HandlelGenerate}
            className="bg-red-500 text-gray-50 p-1 border-1 rounded w-48 font-semibold text-xl hover:scale-105 active:scale-95 transition-all ease-in-out"
          >
            Generate Image
          </button>
        </div>
        {
          generating ? (
            <div className="flex justify-center items-center h-52">
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress color="inherit" />
              </Stack>
            </div>
          ) : (
            <div className="flex justify-center items-center">
                {
                  photo && <img src={photo} alt={prompt} className='w-[80%] h-[500px] object-contain'/>
                }
            </div>
          )
        }
      </div>
      <div className="md:w-[80%] w-full flex justify-center items-center p-4">
        <button onClick={handleShareToAll} className="bg-blue-500 text-gray-50 p-1 border-1 rounded w-48 font-semibold text-xl hover:scale-105 active:scale-95 transition-all ease-in-out">
          {
            sharing ? (
              <Box  sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  Sharing
                  <CircularProgress color="inherit"/>
                </Box>
            ) : 'Share with all'
          }
        </button>
      </div>
    </div>
  );
}

export default GenerateImage;
