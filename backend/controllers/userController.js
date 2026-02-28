import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
export const registerUser = async ( req, res ) => {
  const { name, email, number, password } = req.body;
  if ( !name || !email || !number || !password ) {
    res.status( 400 );
    throw new Error( "Please enter all the fields" );
  }

  // hash the password

  const hashPassword = await bcrypt.hash( password, 10 )


  const newUser = await User.create( {
    name, email, password: hashPassword, number
  } )
  res.send( newUser )
};
