import { Route, Routes } from "react-router-dom";
import './index.scss'
import { lazy, Suspense } from "react";


const Start = lazy(() => import('./pages/Start/Start'));
const UserLogin = lazy(() => import('./pages/UserLogin/UserLogin'));
const UserSignup = lazy(() => import('./pages/UserSignup/UserSignup'));
const CaptainLogin = lazy(() => import('./pages/CaptainLogin/CaptainLogin'));
const CaptainSignup = lazy(() => import('./pages/CaptainSignup/CaptainSignup'));
const UserLogout = lazy(() => import('./pages/UserLogout/UserLogout'));
const CaptainLogout = lazy(() => import('./pages/CaptainLogout/CaptainLogout'));
const UserProtectedWrapper = lazy(() => import('./pages/UserProtectedWrapper/UserProtectedWrapper'));
const CaptainProtectedWrapper = lazy(() => import('./pages/CaptainProtectedWrapper/CaptainProtectedWrapper'));
const UserHome = lazy(() => import('./pages/UserHome/UserHome'));

const App = () => {
    return (
        <>
            <Suspense fallback={<div>Loading Content ...</div>}>
            <Routes>
            <Route path='/' element={<Start />} />
                <Route element={<UserProtectedWrapper />}>
                    <Route path='/login' element={<UserLogin />} />
                    <Route path='/signup' element={<UserSignup />} />
                    <Route path='/home' element={<UserHome/>} />
                    <Route path='/users/logout' element={<UserLogout />} />
                </Route>
                <Route element={<CaptainProtectedWrapper />}>
                    <Route path='/captain-login' element={<CaptainLogin />} />
                    <Route path='/captain-signup' element={<CaptainSignup />} />
                    <Route path='/captain-home' element={<div>Hello Captain</div>} />
                    <Route path='/captains/logout' element={<CaptainLogout />} />
                </Route>
            </Routes>
            </Suspense>
        </>
    )
}

export default App;