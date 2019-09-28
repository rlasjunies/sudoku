export class AuthService{
  name:string;

  constructor(){
    console.log("AuthService started");
    this.name = "Richard LASJUNIES";
  }
}

export const authSvc  = new AuthService();