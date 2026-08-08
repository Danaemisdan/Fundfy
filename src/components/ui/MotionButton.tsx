import React, { FC } from 'react'
import { ArrowRight } from 'lucide-react'

interface Props {
  label?: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export const MotionButton: FC<Props> = ({ label = "REGISTER NOW", className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative h-12 md:h-14 w-48 md:w-56 cursor-pointer rounded-full border-[none] p-1 outline-none bg-[#11131c] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <span
        className='circle bg-white m-0 block h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full duration-500 group-hover:w-full'
        aria-hidden='true'
      ></span>
      <div className='icon absolute top-1/2 left-4 translate-x-0 -translate-y-1/2 duration-500 group-hover:translate-x-[0.4rem]'>
        <ArrowRight className='text-[#11131c] w-5 h-5 md:w-6 md:h-6' />
      </div>
      <span className='button-text text-white group-hover:text-[#11131c] font-futuristic absolute top-2/4 left-2/4 ml-4 -translate-x-2/4 -translate-y-2/4 text-center text-[10px] md:text-[12px] font-bold tracking-[0.2em] uppercase whitespace-nowrap duration-500'>
        {label}
      </span>
    </button>
  )
}
