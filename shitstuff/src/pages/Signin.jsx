import { Button } from "../components/Button"
import { Heading } from "../components/Headig"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword ] = useState("")
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen  flex justify-center">
            <div className="flex flex-col justify-center ">
                <div className="rounded-lg bg-white w-80 text-center">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your creadentials to Authenticate"} />
                     
                    
                     
                    <InputBox onChange={e =>{ 
                        setEmail(e.target.value)
                        }} label="Email" placeholder="example@gmail.com" />
                    <InputBox onChange={e =>{ 
                        setPassword(e.target.value)
                        }} label="password" placeholder="********" />
                    <div className="px-4 pt-1">      
                    <Button onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                 
                                email,
                                password,
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")

                    }}  label="Sign in"/>
                    
                    <BottomWarning label="Don't have an Account" buttonText="Signup" to={'/signup'} />
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}