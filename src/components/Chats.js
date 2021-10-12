import React, {useRef , useEffect, useState} from "react";
import { useHistory } from "react-router";
import { ChatEngine} from 'react-chat-engine'
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats =  () => {
 
    const history = useHistory();
    const {user} = useAuth();
    console.log(user)
    const {loading, setLoading} = useState(true);
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }


    const getFile = async(url) =>{
        const responce = await fetch(url);
        const data = await responce.blob();

        return new File([data], "userPhoto.jpg", {type : 'image/jpeg'})
    }


    useEffect(()=>{
        if(!user)
        {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me/',{
            headers: {
                "project-id" : "441f03ce-1d22-488d-9f1e-7aba5b42bd4b",
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret', user.uid );

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)

                
                axios.post('https://api.chatengine.io/users/',
                formdata, { headers:{"private-key" : "0290e49a-e0bd-4a0f-b8fb-6b01dfed4edc"}})
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
                
            })
                
        })
    }, [user,history])

if(!user || loading) return "loading"


    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                Chatify
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                   Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="441f03ce-1d22-488d-9f1e-7aba5b42bd4b"
                userName={user.email}
                userSecret={user.uid}

             />
        </div>
    );
}

export default Chats;