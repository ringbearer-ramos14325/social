import React, { Component } from "react";
import Header from 'src/pages/header.js'
import { auth } from "../services/firebase";
import { db } from "../services/firebase"


export default class Chat extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            user = auth().currentUser,
            chats = [],
            content: '',
            readError: null,
            writeError: null
    };

}
    
  async componentDidMount() {
      this.setState({ readError: null });
      try {
          db.ref("chats").on("value", snapshot => {
         let chats = [];
         snapshot.forEach((snap) => {
             chats.push(snap.val());
         });
         this.setState({ chats });   
    
        });
    } catch (error) {
        this.setState({ readError: error.message });
        } 
    }

    handleChange(event) {
        this.setState({
          content: event.target.value
        });
      }

    
    render() {
        return (
            <div>
                <div className="chats">
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp}>{chat.content}</p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.content}></input>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit">send</button>
                </form>
                <div>
                    Login in as: <strong>{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
}
