import { Link } from "react-router-dom"
// import {Home} from "../Home/Home"
 import style from './Navbar.module.css'
// import pokeLogo from '../../assets/pokeLogo.png'
export default function Navbar(){

    return(
        <div className={style.Navbar} >
           <Link to ='/Home'> 
           <span>Home</span>
           </Link>
           <Link to ="/Search">
           <span>Buscá tu corredor</span>
           </Link>
           <Link to ="/Create">
           <span>Creá tu corredor</span>
           </Link>
           <Link to ="/About">
           <span>About</span>
           </Link>
          
           
        </div>
    )
}