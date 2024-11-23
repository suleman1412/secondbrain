import Input from './ui/Input'

const Login = () => {
    return (
        <div>
            <form>
                <Input placeholder='Username' />
                <Input placeholder='Password' />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Login
