import React from "react";


function Navbar() {
  
    return (
    //background padding
      // centraliza a logo
      <nav className="bg-stone-100 rounded-b-lg shadow-lg"> 
        <div className="container flex justify-center items-center">
          <img
            src="/EasyBus.svg" 
            alt="EasyBus"
            className="h-8 w-24 my-3"
          />
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  