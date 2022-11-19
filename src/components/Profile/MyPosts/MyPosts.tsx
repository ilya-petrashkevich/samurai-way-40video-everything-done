import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionsTypes, addPostAC, newPostTextType, PostsType, updateNewPostTextAC} from "../../redux/state";

type MyPostsPropsType = {
    posts: PostsType[]
    newPostText: newPostTextType
    dispatch: (action: ActionsTypes) => void
    // updateNewPostText: (newText: string) => void
    // addPost: (postMessage/*?*/: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElementRef = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {

        if (newPostElementRef.current) {
            // let text = newPostElementRef.current.value;

            // props.addPost(props.newPostText);
            props.dispatch(addPostAC(props.newPostText))

            // newPostElementRef.current.value = '';
            // props.updateNewPostText('');
        }
    }

    const onPostChange = () => {
        if (newPostElementRef.current) {
            let text = newPostElementRef.current.value;
            // props.updateNewPostText(text);
            props.dispatch(updateNewPostTextAC(text))
        }
    }

    return (

        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}
                              ref={newPostElementRef}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>

    );
};

export default MyPosts;