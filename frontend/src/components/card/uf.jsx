import React from 'react'

const uf = () => {
  return (
    <>
    <div className="flex h-screen w-screen justify-center items-center">

        <div className='h-[80%] w-[90%] flex justify-center items-center gap-x-30 '>
            <div className='h-[10%] w-[14%] text-xl '><h1 className='animate-pulse'>Choose Your Role</h1>
          
            </div>
            <div className='card1 h-[80%] w-[30%] bg-blue-400 rounded-xl'>
                <h1 className='h-1/7 w-full bg-blue-800 flex justify-center items-center'> USER  </h1>
                <div className="h-6/7 w-full bg-blue-500"> 
                </div>

            </div>
            <div className='card1 h-[80%] w-[30%] bg-blue-400 rounded-xl'>

                <h1 className='h-1/7 w-full bg-blue-800 flex justify-center items-center'> PERFORMER</h1>
            </div>
        </div>
    </div>
    </>
  )
}

export default uf