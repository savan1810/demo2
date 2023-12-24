'use client'

import React, { useState, useEffect } from "react";
import { signOut} from 'firebase/auth' ;
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { auth } from '../Firebase';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from "next/image";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Page() {

    
    const router = useRouter()

    const [image, setImage] = useState([])
    const [Search, setSearch] = useState('')
    const [page, setPage] = useState(1)



    useEffect(() => {
        fetchGIF();
    },[page])

    const fetchGIF = async () => {
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=10&offset=${page === 1 ? 1 : ((page * 10) - 1)}`
        let data = await fetch(url)
        let parseData = await data.json()
        // console.log(parseData.data)
        setImage(parseData.data)
        console.log(image)
    }


    const submit = async (event) => {
        console.log('submit', Search)
        event.preventDefault()
        let url = `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${Search}&limit=10&offset=${page === 1 ? 1 : ((page * 10) - 1)}`
        let data = await fetch(url)
        let parseData = await data.json()
        // console.log(parseData.data)
        setImage(parseData.data)
        setSearch('')
    }
    return (

        <>
            <div className='w-full text-white' style={{
                backgroundColor: "rgb(0,0,33)", height: "100vh",
                overflowY: "scroll",
                overflowX: "hidden"
            }} >
            <div className="w-full text-right p-4">

                <button className="text-white border  px-4  py-2 rounded-md border-sky-400 hover:bg-sky-400" onClick={()=>{
                    
                    return (
                        signOut(auth).then((val)=>router.push('/login'))
                )}}>
                    Log out
                </button>
            </div>

                <form className='w-2/5 -mt-6 mx-auto pt-12 ' onSubmit={submit}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Search stickers..." required value={Search} onChange={(event) => {
                            return (
                                setSearch(event.target.value)
                            )
                        }} />

                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-sky-500 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-500 dark:hover:bg-sky-400 dark:focus:ring-sky-400">Search</button>
                    </div>
                </form>

                <div className='flex flex-wrap justify-evenly w-4/5  mx-auto mt-8 '>

                    {image.length==0?'OOPs, No Data Found':image.map((items,index) => {
                        return (
                            <>
                                <div key={index} className="hover:scale-105 cursor-pointer  card text-gray-100 rounded-xl border border-gray-500 mt-4" style={{ width: "", backgroundColor: "rgb(63,63,73)" }} >
                                    <Image key={index} src={items.images.original.url} width={256} height={192} loading="lazy" className="rounded-t-xl card-img-top  h-48 w-64 object-cover" alt="..." />
                                    {/* <div>{items.images.original.url}</div> */}
                                    <div key={index} className="card-body flex justify-between px-2 items-center ">
                                        <h5 key={index} className="card-title my-2 align-middle   max-w-56 overflow-hidden ">{items.title?.slice(0, 20)}</h5>
                                        <div key={index}>
                                            <button key={index} className="btn p-0 rounded-md bg-sky-300  text-white hover:bg-sky-400" ><FavoriteBorderIcon /></button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="w-full flex justify-center my-10 text-white">
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Stack spacing={2} >
                            <Pagination count={5} page={page} size="large" onChange={(_, page) => setPage(page)} variant="outlined" color="secondary" />
                        </Stack>
                    </ThemeProvider>



                </div>
            </div>

        </>




    )
}
