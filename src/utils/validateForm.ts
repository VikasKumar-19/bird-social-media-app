export enum formType{
  LOGIN = "login",
  REGISTER = "register",
}

export const validateForm = (form: formType)=>{
  let error = "";
  switch(form){
    case formType.LOGIN: 
      return error;

    case formType.REGISTER: 
      return error;
  }
}