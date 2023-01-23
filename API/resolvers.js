import axios from 'axios';

const resolvers = {
    Query: {
      login: async (a, args) => {
        const response = await axios.post("http://localhost:1411"+"/api/login", args)
        return {JWT : response.data.user}
      },
  
      register: async (a, args) => {
        const response = await axios.post("http://localhost:1411"+"/api/register", args)
        return {res:response.data.status}
      },
  
      dashboard: async(a, args) => {
        const response = await axios.get("http://localhost:1411"+"/api/dashboard", {headers:{
          "x-access-token":`${args.JWT}`
        }})
        const userString = JSON.stringify(response.data.user)
        return {user:userString}
      },
      
      confirmContact: async(a, args) => {
        const response = await axios.patch("http://localhost:1411"+"/api/ConfirmContact", {contactToAccept:args.contactToAccept},{headers:{
          "x-access-token":`${args.JWT}`
        }})
        return {confirmed:response.data.response}
      },
  
      addContact: async(a, args) => {
        const response = await axios.post("http://localhost:1411"+"/api/addContact", {contactToAdd:args.contactToAdd},{headers:{
          "x-access-token":`${args.JWT}`
        }})
        return {added:response.data.response}
      },
  
      getChat: async(a, args) => {
        const response = await axios.post("http://localhost:1412"+"/api/getChat", args)
        return {msgID:response.data.msgID}
      },
  
      createGroup: async (a, args) => {
        const contactsArr = args.contacts.replace(" ","").split(",")
        const verification = await axios.post("http://localhost:1411"+"/api/verify", {contacts:contactsArr})
        let contactsToPatch = verification.data.user
        contactsToPatch.push(args.me)
        if(contactsToPatch.length === 1){
          return {isCreated:false}
        }
        const createGroup = await axios.post("http://localhost:1412"+"/api/createGroupChat",{nameOfGroup:args.nameOfGroup, contactsOfGroup: contactsToPatch}, {headers:{
          "x-access-token":`${args.JWT}`
        }})
        const {date, GroupID} = createGroup.data
        if(!GroupID){
          return {isCreated:false}
        }
        const patch = await axios.patch("http://localhost:1411"+"/api/addRooms",{contacts:contactsToPatch, convID:GroupID, nameOfGroup:args.nameOfGroup})
        if(patch.status != 200){
          return {isCreated:false}
        }
        return {isCreated:true}
      },
  
      messages: async (a, args) => {
        let url = "http://localhost:1412"+"/api/getMsg"
        url = new URL(url)
        url.searchParams.set("msgID",args.id)
        let messages = await axios.get(url)
        return {messages:JSON.stringify(messages.data.msg)}
      },
  
      addToGroup:async (a, args) => {
        const contactsArr = args.contactsToAdd.replace(" ","").split(",")
        const verification = await axios.post("http://localhost:1411"+"/api/verify", {contacts:contactsArr})
        let contactsToPatch = verification.data.user
        if(contactsToPatch.length === 0){
          return {response:false}
        }
        const patch = await axios.patch("http://localhost:1411"+"/api/addRooms",{contacts:contactsToPatch, convID:args.convID, nameOfGroup:args.nameOfGroup})
        if(patch.status != 200){
          return {response:false}
        }
        return {response:true}
      },
  
      sendMsg: async (a, args) => {
        const send = await axios.post("http://localhost:1412"+"/api/sendMsg",{chatID:args.chatID, remittent:args.remittent, msg:args.msg, isImage: args.isImage})
        return {sent:send.data.sent}
      }
    }
  };

export default resolvers;