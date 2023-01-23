import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./styles/Register_style.module.css"
import Swal from 'sweetalert2'

const Register = () => {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordconf, setPasswordconf] = useState("")
	const [lang, setLang] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const query = await fetch("http://localhost:4000/"+"graphql",{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `query Register{register(name:"${name}",email:"${email}", password:"${password}", passwordConf:"${passwordconf}", lang:"${lang}"){res}}`
			}),
		})
		const datum = await query.json() 
		if (datum.data.register.res === "ok") {
			navigate('/login')
		}else{
			Swal.fire({
				title: "Error",
				text: datum.data.register.res
			})
		}
	}
	return (
		<div className={style.container}>
				<form onSubmit={registerUser}>
					<div className={style.section}>
						<div className={style.title}>Name</div>
						<div className={style.field}>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
							/>
						</div>
					</div>
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
						<div className={style.title}>Password</div>
						<div className={style.field}>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
							/>
						</div>
					</div>
					<div className={style.section}>
						<div className={style.title}>Confirm Password</div>
						<div className={style.field}>
							<input
								value={passwordconf}
								onChange={(e) => setPasswordconf(e.target.value)}
								type="password"
							/>
						</div>
					</div>
					<div className={style.section}>
						<div className={style.title}>select Language</div>
						<div className={style.field}>
							<select className={style.langList} onChange={(e) => {
								setLang(e.target.value)
							}}>
								<option value="en-US" >English</option>
								<option value="es-MX">Spanish</option>
								<option value="fr-FR" >French</option>
							</select>
						</div>
					</div>
					<div className={style.section}>
						<div className={style.button}><input className={style.register_button} type="submit" value="Register" /></div>
					</div>
					<div className={style.field}>You alredy have an account?! <br></br><a href='/login'>login!</a></div>
				</form>
				<br/>
			</div>
	)
}

export default Register