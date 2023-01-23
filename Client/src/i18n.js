import i18next from "i18next"
import {initReactI18next} from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources:{
            en:{
                translation:{
                    welcome:"Welcome",
                    createGroup:"Create a new Chat Room",
                    groupName:"Name of the room:",
                    contactsToAdd:"Contacts to add:",
                    noChats:"There are no chats",
                    contacts:"Contacts",
                    noContacts:"You have no contacts, add some friends",
                    addContacts:"Add a contact",
                    typeEmail:" Please type the e-mail of the contact you want to add",
                    cancel:"cancel",
                    chatRooms:"Chat Rooms",
                    logOut:"logOut",
                    create:"create",
                    yourInfo:"your info",
                    Language:"Language",
                    Name:"Name",
                    Great:"Great",
                    NewFriend:"You have a new friend",
                    Wait:"Wait",
                    NeedsToAccept:"Your friend needs to accept you first",
                    MessageError:"there was an error while sending the message :(",
                    Conversation:"Select a friend or group and start to chat",
                    DrawSomething:"Draw something and send it to your friend!",
                    Send:"Send",
                    ErrorCreatingGroup:"There was an error while creating the group, verify the emails and try again",
                    add:"add",
                    ErrorAdding:"There was an error while adding the contact",
                    ValidEmail:"Add a valid e-mail",
                    noEmptyName:"The name mustn't be empty"
                }
            },
            es:{
                translation:{
                    welcome:"Bienvenido",
                    createGroup:"Crear un nuevo grupo de Chat",
                    groupName:"Nombre del grupo:",
                    contactsToAdd:"Contactos a añadir:",
                    noChats:"Aún no tienes chats",
                    contacts:"Contactos",
                    noContacts:"No tienes contactos, ¡añade algunos amigos!",
                    addContact:"Agregar un amigo",
                    typeEmail:"Por favor escribe el e-mail del contactos que deseas agredar",
                    cancel:"cancelar",
                    chatRooms:"Salas de Chat",
                    logOut:"Salir",
                    create:"crear",
                    yourInfo:"Tu información!",
                    Language:"Idioma",
                    Name:"Nombre",
                    Great:"Genial",
                    NewFriend:"Tienes un nuevo amigo",
                    Wait:"Espera",
                    NeedsToAccept:"Tu amigo necesita aceptarte antes",
                    MessageError:"Ocurrió un error mientras se intentaba enviar el mensaje :(",
                    Conversation:"Selecciona un amigo o grupo y empieza a chatear",
                    DrawSomething:"Dibuja algo y mándalo a tus amigos!",
                    Send:"Enviar",
                    ErrorCreatingGroup:"Ha ocurrido un error mientras se creaba el grupo, verifica los emails e intenta de nuevo",
                    add:"agregar",
                    ErrorAdding:"Ocurrió un error mientras se añadía el contacto",
                    ValidEmail: "Agrega un e-mail válido",
                    noEmptyName:"El nombre no debe estar vacío"
                }
            },
            fr:{
                translation:{
                    welcome:"Bienvenu",
                    createGroup:"Créer un grupe",
                    groupName:"nom du groupe:",
                    contactsToAdd:"inviter des participants:",
                    noChats:"Il n'y a pas de chat",
                    contacts:"Contacts",
                    noContacts:"Vous n'avez aucun contact, ajoutez des amis!",
                    addContacts:"ajoutez des amis",
                    typeEmail:"Veuillez saisir l'e-mail du contact que vous souhaitez ajouter",
                    cancel:"annuler",
                    chatRooms:"salles de discussions",
                    logOut:"Se déconnecter",
                    create:"créer",
                    yourInfo:"votre informations",
                    Language:"Language",
                    Name:"Nom",
                    Great:"Génial",
                    NewFriend:"tu as un nouvel ami",
                    Wait:"Attendez",
                    NeedsToAccept:"Votre ami doit d'abord vous accepter",
                    MessageError:"il y a eu une erreur lors de l'envoi du message :(",
                    Conversation:"Sélectionnez un ami ou un groupe et commencez à discuter",
                    DrawSomething:"Dessine quelque chose et envoie-le à ton ami !",
                    Send:"envoyer",
                    ErrorCreatingGroup:"Une erreur s'est produite lors de la création du groupe, vérifiez les e-mails et réessayez",
                    add:"aggregate",
                    ErrorAdding:"Une erreur s'est produite lors de l'ajout du contact",
                    ValidEmail:"ajouter un email valide",
                    noEmptyName:"le nom ne doit pas être vide"
                }
            }
        }
    })