import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import { RecoilRoot } from 'recoil';

const Layout = () => {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path='/' element = {<Landing />} />
                    <Route path='/login' element = {<Login />} />
                    <Route path='/register' element = {<Register />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
}

export default Layout;