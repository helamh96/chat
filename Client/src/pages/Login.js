import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import style from "./styles/login_style.module.css"
import swal from "sweetalert2"

const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	const loginUser = async(event) => {
		event.preventDefault()
		const query = await fetch("http://localhost:4000/"+"graphql",{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `query Login{login(email:"${email}", password:"${password}"){JWT}}`
			}),
		})
		const datum = await query.json() 
		if (datum.data.login.JWT) {
			Cookies.set("token", datum.data.login.JWT)
			navigate('/dashboard')
		} else {
			swal.fire({
				title:"Wrong credentials",
				text: 'Please check your username and password'
			})
		}
	}

	return (
		
		<div className={style.container}>
			<form onSubmit={loginUser}>
				<div className={style.section}>
					<div className={style.title}>e-mail</div>
					<div className={style.field}>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
						/>
					</div>
				</div>
				<div className={style.section}>
					<div className={style.title}>password</div>
					<div className={style.field}>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
					</div>
				</div>
				<div className={style.section}>
					<div className={style.button}>
						<input id={style.loginbtn} type="submit" value="Login" />
					</div>
				</div>
				<div className={style.section}>
					Don't have an account already <br></br> <a href='/register'>register</a>
				</div>	
			</form>	
		</div>
	)
}

export default Login