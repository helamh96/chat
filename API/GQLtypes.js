const typeDefs = `
  type Messages{
    messages: String!
  }

  type AddToGroup{
    response:Boolean
  }

  type CreateGroup{
    isCreated: Boolean,
    msg:String!
  }

  type Login {
    JWT: String!
  }

  type Register {
    res: String!
  }

  type Dashboard{
    user: String!
  }

  type ConfirmContact{
    confirmed: Boolean
  }

  type AddContact{
    added: Boolean
  }

  type GetChat{
    msgID: String!
  }

  type SendMsg{
    sent: Boolean
  }

  type Query {
    login(email:String!,password:String!): Login,
    register(name:String!, email:String!, password:String!, passwordConf:String!, lang:String!): Register,
    dashboard(JWT:String!): Dashboard,
    confirmContact(JWT:String!, contactToAccept:String!): ConfirmContact,
    addContact(JWT:String!, contactToAdd:String!): AddContact,
    getChat(me:String!, contact:String!): GetChat,
    sendMsg(msg:String!, remittent:String!, chatID:String!, isImage:Boolean): SendMsg
    createGroup(me:String!, contacts:String!, JWT:String!, nameOfGroup:String!): CreateGroup,
    messages(id:String!): Messages,
    addToGroup(contactsToAdd:String!, convID:String!, nameOfGroup:String!): AddToGroup  
  }
`;

export default typeDefs