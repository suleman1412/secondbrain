import axios from 'axios';
import React from 'react'
import { Button } from './ui/Button';
// import PlusIcon from './ui/icons/plusIcon';

const Register = () => {
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const userData = {
            username: data.get('username'),
            password: data.get('password')
        }
        console.log(userData)
        console.log("Sending to backend now")
        const response = await axios.post('http://localhost:3000/v1/user/register', userData)
        console.log(response.data)
    }

    const handleChange = () => {
        // TODO: Handle real time changes with zod
        console.log("change observed")
    }
    // TODO: isLoggedIn a state variable
    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Enter your username' onChange={handleChange}/>
                <input type='password' name='password' placeholder='Enter your password' />
                <input className='cursor-pointer' type='submit' />
            </form>
            {/* <Button variant="primary" text="Add Content" icon={<PlusIcon />} size="lg" />
            <Button variant="secondary" text="Add Content" icon={<PlusIcon />} size="md" /> */}

        </div>
    )
}

export default Register
