import React, { createContext, FC, PropsWithChildren, useState } from 'react'

interface StoreType {
  user: string | null;
  handleUser: undefined | ((user:string)=>void);
  handleLogout: undefined | (()=>void);
}

const initialState: StoreType = {
  user: null,
  handleUser: undefined,
  handleLogout: undefined,
}

export const AuthContext = createContext<StoreType>(initialState);

const AuthWrapper:FC<PropsWithChildren> = (props) => {
  const [user, setUser] = useState<string | null>(()=>localStorage.getItem("loggedIn"));

  const store:StoreType = {
    user: user, 
    handleUser: (user:string)=>{
      localStorage.setItem("loggedIn", user)
      setUser(user)
    },
    handleLogout: ()=>{
      localStorage.removeItem("loggedIn");
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={store}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper