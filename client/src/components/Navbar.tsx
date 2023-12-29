import React from 'react'
import { Logo } from '../assets'
import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {

    const { pathname } = useLocation()

    return (
        <div className='relative flex items-center justify-center h-[4.5rem] w-full bg-dark-popover text-dark-foreground border-b border-dark-border  ' >

            <Link to='/' className='absolute left-4 ' > <img src={Logo} alt="Smacipher" className='w-36 ' /></Link>

            <ul className="flex justify-center items-center gap-8 ">
                <Link to='/text' className={`${pathname == '/text' ? 'text-dark-primary underline' : 'text-dark-muted-foreground'} font-[cursive] text-[22px] hover:underline hover:text-dark-foreground cursor-pointer`} >Text</Link>
                <Link to='/image' className={`${pathname == '/image' ? 'text-dark-primary underline' : 'text-dark-muted-foreground'} font-[cursive] text-[22px] hover:underline hover:text-dark-foreground cursor-pointer `}>Image</Link>
            </ul>

            {/* <div className="flex justify-center items-center gap-4 ">
                <button onClick={() => { }} className={`bg-dark-muted rounded-md hover:bg-dark-muted-foreground hover:text-dark-primary-foreground hover:bg-opacity-90 px-4 py-3 w-full `} >Register</button>
                <button onClick={() => { }} className={`bg-dark-muted rounded-md hover:bg-dark-muted-foreground hover:text-dark-primary-foreground hover:bg-opacity-90 px-4 py-3 w-full `} >Login</button>
            </div> */}

        </div>
    )
}

export default Navbar