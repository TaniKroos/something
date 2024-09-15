import { Button } from "../components/Button"
import { Heading } from "../components/Headig"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirst_Name] = useState("")
    const [lastName, setLast_Name] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword ] = useState("")
    const navigate  =  useNavigate();
    return (
        <div className="bg-slate-300 h-screen  flex justify-center">
            
            <div className="flex flex-col justify-center ">
                <div className="rounded-lg bg-white w-80 text-center">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <InputBox onChange={e =>{ 
                        setUsername(e.target.value)
                        }} label="username" placeholder="kroos" />
                    <InputBox onChange={e =>{ 
                        setFirst_Name(e.target.value)
                        }} label="First_Name" placeholder="Tanish" />
                    <InputBox onChange={e =>{ 
                        setLast_Name(e.target.value)
                        }} label="Last_Name" placeholder="Tanish" />
                    <InputBox onChange={e =>{ 
                        setEmail(e.target.value)
                        }} label="Email" placeholder="example@gmail.com" />
                    <InputBox onChange={e =>{ 
                        setPassword(e.target.value)
                        }} label="password" placeholder="********" />
                    <div className="px-4 pt-1">      
                    <Button onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username,
                                firstName,
                                lastName,
                                email,
                                password,
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")

                    }} label="Sign UP"/>
                    
                    <BottomWarning label="Already have an Account" buttonText="Singin" to={'/signin'} />
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}