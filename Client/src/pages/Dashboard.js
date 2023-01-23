import React from "react"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import UserInfo from "../Components/info/UserInfo"
import Contacts from "../Components/info/Contacts"
import CurrentChat from "../Components/chat/CurrentChat"
import { Container, Divider } from "@mui/material"
import Chat from "../Components/info/ChatRooms"
import { useDispatch, useSelector } from "react-redux"
import {setUser} from "../redux/reducers/user"
import { useTranslation } from "react-i18next"
import {gql, useQuery} from "@apollo/client"


const Dashboard = () => {
	const {i18n} = useTranslation()
	const chatRedux = useSelector(state => state.chat)
	const actualChat = chatRedux === undefined ? "none" : chatRedux

	const navigate = useNavigate()
	const dispatch = useDispatch()


	const LOGIN = gql`query Dashboard{dashboard(JWT:"${Cookies.get('token')}"){user}}`
	const { loading, error, data } = useQuery(LOGIN);
	

	
	useEffect(()=> {
		const setDashboard = () => {
			if(data){
				const user = JSON.parse(data.dashboard.user)
				dispatch(setUser(user))
				i18n.changeLanguage(user.lang)
			}
			if(error){
				Cookies.remove('token')
	 			navigate('/login')
			} 
		}
		setDashboard()
	},[data])

	if(loading) return "loading..."
	

	
	
	return (
		<Container disableGutters maxWidth={false} sx={{ display: "flex", backgroundColor: "white", paddingLeft: "0px", width: "100vw", height: "100vh" }}>
			<Container disableGutters sx={{width:"30vw"}}>
				<UserInfo/>
				<Divider/>
				<Contacts/>
				<Divider/>
				<Chat/>
			</Container>
			<Container disableGutters sx={{display:"flex",width:"70vw", justifyContent:"center", textAlign:"center"}}>
				<CurrentChat contact={actualChat}/>
			</Container>
		</Container>
	)
	
}

export default Dashboard