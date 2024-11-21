import { Button } from './ui/Button'
import Input from './ui/Input' 

const Hero = () => {
  
    return (
        <div className='my-12 mx-auto w-full md:w-[70%] px-4 flex-grow flex flex-col text-center items-center gap-12 overflow-x-hidden'> 
            <h1 className='font-font1 font-semibold text-[2.5rem] md:text-[3.5rem]  tracking-tight text-text'>
                Your <span className='font-font2 tracking-tight font-normal'> Digital</span> Mind:
                Save, Share, Revisit
            </h1>
            <div className='flex flex-col gap-4 mx-auto'>
                <h1 className='text-[0.8rem] md:text-[1rem] lg:text-[1.2rem] mx-auto font-semibold text-border'>
                    Organize your thoughts, one link at a time!
                </h1>
                <Input placeholder='Title...' />
                <Input placeholder='Link...' />
                <Button variant='secondary' className='mx-auto'>
                    <h1 className='text-[0.8rem] md:text-[1rem] font-medium'>Get Started</h1>
                </Button>        
            </div>
        </div>
    )
}

export default Hero