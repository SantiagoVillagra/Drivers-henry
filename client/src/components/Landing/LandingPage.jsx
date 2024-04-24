import style from './landing.module.css'
import { Navigate, useNavigate } from 'react-router-dom'


export default function LandingPage(){

const navigate = useNavigate()

    return(
        <div className={style.fondo} >
            <h1>Bienvenido!</h1>
        <button onClick={() =>navigate("/home")}> Comenzar</button>
        </div>
    )
} 

