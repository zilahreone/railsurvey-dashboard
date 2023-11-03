import React from 'react'
import MLogo from '@images/footer/logo-mtec.png'
import NLogo from '@images/footer/logo-nectec.png'
import NSLogo from '@images/footer/logo-nstda.png'
const d = new Date().getFullYear()
function Foot() {
  return (
    <footer>
      <div className="p-6 flex flex-col justify-center gap-2 bg-yellow-500">
        <span className="block text-sm sm:text-center text-white dark:text-gray-400">© { d }. All Rights Reserved.</span>
        <span className="flex justify-center gap-2 text-sm sm:text-center text-white dark:text-gray-400">
          <img className='object-contain h-12' src={NSLogo} alt="" />
          <img className='object-contain h-12' src={MLogo} alt="" />
          <img className='object-contain h-12' src={NLogo} alt="" />
        </span>
      </div>
    </footer>
  )
}

export default Foot