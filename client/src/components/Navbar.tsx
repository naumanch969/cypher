import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className='flex items-center justify-between h-16 w-full bg-dark-popover text-dark-foreground border-b border-dark-border  ' >

            <span className='text-dark-primary text-2xl font-[cursive] ' >Cypher</span>

            <ul className="flex justify-center items-center gap-4 ">
                <li className='text-base hover:underline text-dark-primary hover:text-dark-foreground cursor-pointer ' >Text</li>
                <li className='text-base hover:underline text-dark-primary hover:text-dark-foreground cursor-pointer ' >Image</li>
            </ul>

            <div className="flex justify-center items-center gap-4 ">
                <button onClick={() => { }} className={`bg-dark-muted rounded-md hover:bg-dark-muted-foreground hover:text-dark-primary-foreground hover:bg-opacity-90 px-4 py-3 w-full `} >Register</button>
                <button onClick={() => { }} className={`bg-dark-muted rounded-md hover:bg-dark-muted-foreground hover:text-dark-primary-foreground hover:bg-opacity-90 px-4 py-3 w-full `} >Login</button>
            </div>

        </div>
    )
}

export default Navbar