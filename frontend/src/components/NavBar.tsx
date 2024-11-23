import { Brain } from "lucide-react"
import { ReactElement} from "react"
import { Button } from "./ui/Button"
import { Link } from 'react-router-dom';


export const NavBar = (): ReactElement => {
  
    return(
        <div className='flex justify-between items-center text-text '>
            <div className='brand flex gap-2 items-center '>
                <Brain className="size-6 md:size-10"/>
                <h1 className='font-font1 font-semibold text-weigh text-[1.25rem] md:text-[2rem] tracking-tight'>Second Brain</h1>
            </div>
            <div className='flex gap-4 text-[0.6rem] md:text-[0.8rem] font-medium'>
                <Link to='/login'>
                    <Button variant='secondary'>
                        Login
                    </Button>
                </Link>
                <Link to='/register'>
                    <Button variant='primary'>
                        Register
                    </Button>
                </Link>
            </div>
        </div>
    )
}
