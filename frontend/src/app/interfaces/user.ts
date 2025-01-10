export interface User{
    name?: string,        
    lastname?: string,
    email: string,
    password: string,
    credential?: string,
}

// La ? inidca que puede ser null si se ha de importar en un módulo que no 
// necesite esa propiedad en concreto