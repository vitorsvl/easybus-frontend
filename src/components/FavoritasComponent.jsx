import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function FavoritasComponent() {
    
    const { user } = useContext(AuthContext);
    return (
     <div>
        <span>Linhas Favoritas de {user.name}</span>
     </div>
    );
  }
  
  export default FavoritasComponent;
  