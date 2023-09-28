import React from "react";


function Navbar() {
  
    return (
    //background padding
      // centraliza a logo
      <nav className="bg-stone-100 rounded-b-lg shadow-lg"> 
        <div className="container  flex justify-center items-center">
          <img
            src="/EasyBus.svg" 
            alt="EasyBus"
            className="h-24 w-24 h-fit my-3" // Adjust the size of your logo as needed
          />
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  