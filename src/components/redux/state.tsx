// let onChange = () => {
//     console.log('State was changed')
// }

// export const subscribe = (/*callback*/observer: () => void) => {
//     onChange = observer;
// }

export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

export type newMessageBodyType = string
let newMessageBody: newMessageBodyType = "";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type newPostTextType = string //это под снос
let newPostText: newPostTextType = 'it-kamasutra.com'; //это под снос

export type StateType = {
    dialogsPage: {
        dialogs: DialogsType[]
        messages: MessagesType[]
        newMessageBody: string
    }
    profilePage: {
        posts: PostsType[]
        newPostText: newPostTextType //эта строчка под снос
    }
    sidebar: {}
}

let dialogs: DialogsType[] = [
    {id: 1, name: "Dimich"},
    {id: 2, name: "Andrew"},
    {id: 3, name: "Sveta"},
    {id: 4, name: "Sasha"},
    {id: 5, name: "Viktor"},
    {id: 6, name: "Valera"},
];

let messages: MessagesType[] = [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you"},
    {id: 3, message: "Yo"},
    {id: 4, message: "Bla"},
    {id: 5, message: "Blabla"},
    {id: 6, message: "Blablabla"},
];

let posts: PostsType[] = [
    {id: 1, message: "Hi, how are you?", likesCount: 12},
    {id: 2, message: "It`s my first post", likesCount: 5},
];


// export let state: StateType = {
//     dialogsPage: {
//         dialogs,
//         messages
//     },
//     profilePage: {
//         posts,
//         newPostText //эта строчка под снос
//     }
// }

// export let addPost = (postMessage?: string) => {
//     let newPost: PostsType = {
//         id: state.profilePage.posts.length + 1, // или просто номер вставлять вручную
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = '';
//     onChange();
// }

// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText;
//     onChange();
// }

export type StoreType = {
    _state: StateType
    // updateNewPostText: (newText: string) => void
    // addPost: (postMessage/*?*/: string) => void
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => StateType
    dispatch: (action: ActionsTypes) => void // в значение ключа action можно напрямую вставить AddPostActionType | UpdateNewPostTextActionType
}

// type AddPostActionType = {
//     type: 'ADD-POST'
//     postMessage: string
// }
// type AddPostActionType = ReturnType<typeof addPostAC>

// type UpdateNewPostTextActionType = {
//     type: 'UPDATE-NEW-POST-TEXT'
//     newText: string
// }
// type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>

// export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType;

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>;

export const addPostAC = (postMessage: string)/*: AddPostActionType*/ => {
    return {
        type: "ADD-POST",
        postMessage: postMessage
    } as const
}

export const updateNewPostTextAC = (newText: string)/*: UpdateNewPostTextActionType*/ => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}

export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: body
    } as const
}

export const sendMessageAC = (/*тут возможно нужен входящий аргумент*/) => {
    return {
        type: 'SEND-MESSAGE'
    } as const
}

export const store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs,
            messages,
            newMessageBody
        },
        profilePage: {
            posts,
            newPostText //эта строчка под снос
        },
        sidebar: {}
    },
    // updateNewPostText(newText: string) {
    //     this._state.profilePage.newPostText = newText;
    //     this._onChange();
    // },
    // addPost(postMessage/*?*/: string) {
    //     const newPost: PostsType = {
    //         id: this._state.profilePage.posts.length + 1, // или просто номер вставлять вручную
    //         message: postMessage, //state.profilePage.newPostText,
    //         likesCount: 0
    //     }
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._onChange();
    // },
    _onChange() {
        console.log('State was changed')
    },
    subscribe(callback/*: () => void*/) {
        this._onChange = callback;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost: PostsType = {
                id: this._state.profilePage.posts.length + 1, // или просто номер вставлять вручную
                message: action.postMessage, //state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._onChange();
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._onChange();
        } else if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
            this._state.dialogsPage.newMessageBody = action.body;
            this._onChange();
        } else if (action.type === 'SEND-MESSAGE') {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messages.push({id: 6, message: body});
            this._onChange();
        }
    }
}