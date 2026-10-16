import { Logo } from '@/components/layout/header/logo'
import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex items-center flex-col justify-center w-full h-screen'>
        <Logo className='scale-150 animate-pulse' />
        <Loader2 className='animate-spin duration-500 mt-4' />
    </div>
  )
}

export default Loading