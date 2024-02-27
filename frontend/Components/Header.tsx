"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from './Logo.png'
import { useAuth } from "@/context/AuthContext"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(31 41 55 / 1)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Header() {

    const {user, logout, loading} = useAuth()
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        logout();
        handleClose()
    }

    return (
    <header className="flex p-2 justify-between fixed w-full top-0 bg-gray-900 z-50 shadow-md">
        <div className="flex space-x-2 items-center">
            <Link href='/'>
                <Image src={logo}
                alt="logo"
                height={50}
                width={250}
                />
            </Link>
        </div>
        <div className="flex text-xs md:text-base divide-x items-center">
            <Link 
                href='/GenerateImage'
                className="px-2 font-light text-right text-white"
            >
                Generate Image 
            </Link>
            {
                !user ? (
                    <Link 
                        href='/Signup'
                        className="px-2 font-light text-white"
                    >
                        Signup
                    </Link>
                ) : (
                    <button 
                        className="px-2 font-light text-white"
                        onClick={handleOpen}
                    >
                        Logout
                    </button>
                )
            }
        </div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} >
            <Typography id="transition-modal-title" className="width-full text-center text-white font-semibold" variant="h6" component="h2">
              Are u Sure?
            </Typography>
            <Typography id="transition-modal-description" className="width-full flex justify-evenly items-center" sx={{ mt: 2 }}>
                <button onClick={handleClose} className="p-2 w-24 font-semibold text-white border-4 border-red-800 rounded bg-red-800 hover:bg-white hover:text-red-800 transition-all duration-300">No</button>
                <button onClick={handleLogout} className="p-2 w-24 font-semibold text-white border-4 border-green-600 rounded bg-green-600 hover:bg-white hover:text-green-600 transition-all duration-300">YES</button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
       {
        loading && <Box sx={{ width: '100%', position: 'fixed', top: '65px', left: '0', }}>
            <LinearProgress />
          </Box>
       }
    </header>
  )
}

export default Header
