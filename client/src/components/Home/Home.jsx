import style from "../Home/Home.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { findRenderedComponentWithType } from "react-dom/test-utils";

export default function Home() {



  useEffect(() => {
    
  }, []);

  return (
    <div className={style.home}>
      <h1>Drivers</h1>
      <form action="">
        <select>
            <option value=""></option>
        </select>
      </form>

      <div>
      </div>
    </div>
  );
}


