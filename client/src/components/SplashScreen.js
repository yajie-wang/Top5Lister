import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div style = {{marginBottom: "3rem"}}>
                    Welcome to the Top 5 List Tool
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
                This site helps you create your own top 5 lists and add the top 5 of anything you like in it.
            </div>

            <div id = "splash-developer">
                Developed By Ruibo Xu
            </div>
            
        </div>
    )
}