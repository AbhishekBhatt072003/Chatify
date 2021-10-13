import React, {useRef , useEffect, useState} from "react";
import { useHistory } from "react-router";
import {Avatar, ChatEngine} from 'react-chat-engine'
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats =  () => {
 
    const history = useHistory();
    const {user} = useAuth();
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

        axios.get('https://api/chatengine.io/users/me',{
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
            let formData = new FormData();
            formData.append('email',user.email);
            formData.append('username', user.displayName);
            formData.append('secret', user.uid );

            getFile(user.photoUrl)
            .then((avatar) => {
                formData.append('avatar', avatar, avatar.name)




                ///csontiasgkasdjaklsjdfklasdjfffffffffffffffffffffffffffffffl
            })
        })
    }, [user,history])




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
                projectId="441f03ce-1d22-488d-9f1e-7aba5b42bd4b"
                userName=""
                userSecret=""

             />
        </div>
    );
}

export default Chats;