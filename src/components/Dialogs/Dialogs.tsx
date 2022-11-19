import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
    ActionsTypes,
    DialogsType,
    MessagesType,
    newMessageBodyType,
    sendMessageAC,
    updateNewMessageBodyAC
} from "../redux/state";

type DialogsPropsType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    newMessageBody: newMessageBodyType
    dispatch: (action: ActionsTypes) => void
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

    let messagesElements = props.messages.map(m => <Message message={m.message}/>);

    let newMessageBody = props.newMessageBody;

    let onSendMessageClick = () => {
        props.dispatch(sendMessageAC())
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.dispatch(updateNewMessageBodyAC(body));

    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>

                <div>
                    <textarea value={newMessageBody}
                              onChange={onNewMessageChange}
                              placeholder='Enter your message'
                              cols={40} rows={5}>
                    </textarea>
                </div>

                <div>
                    <button onClick={onSendMessageClick}>SEND</button>
                </div>

            </div>


        </div>
    );
};

export default Dialogs;