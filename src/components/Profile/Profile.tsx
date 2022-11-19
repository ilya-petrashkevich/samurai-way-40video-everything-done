import React from 'react';
// import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, newPostTextType, PostsType/*, updateNewPostText*/} from "../redux/state";

type ProfilePropsType = {
    profilePage: {
        posts: PostsType[]
        newPostText: newPostTextType
    }
    dispatch: (action: ActionsTypes) => void
    // addPost: (postMessage/*?*/: string) => void
    // updateNewPostText: (newText: string) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}
                // updateNewPostText={props.updateNewPostText}
                // addPost={props.addPost}
            />
        </div>
    )
};

export default Profile;