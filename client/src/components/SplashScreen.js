import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div style = {{marginBottom: "3rem"}}>
            Welcome to the  Top 5 Lister Site!
            </div>


            
            <button id = "splash-button"
                style = {{marginBottom: "3rem"}}>
                <Link to='/login/'>Log In</Link>
            </button> 
            
            
            <button  id = "splash-button"
                style = {{marginBottom: "3rem" }} >
                    <Link to="/register/"> Create Account</Link>
            </button>
            

            
            <button id = "splash-button"
                style = {{marginBottom: "3rem"}} 
                >   
                    <Link to="/register/">Continue as Guest</Link>
            </button>
            

            <div id = "splash-introduction"
                >
                   This is an application where users can list their five favorite anything as well as see lists made by other users and even see the aggregate top 5 lists of all users for a given category.
            </div>

            <div id = "splash-developer">
                Developed By Yajie Wang
            </div>
            
        </div>
    )
}