import React, { useEffect, useState } from "react";
import "./Messages.module.css";
import classes from "./Messages.module.css";
import socketio from "socket.io-client";
import useWebSocket from "react-use-websocket";

function Messages() {
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket("ws://127.0.0.1:9500/ws/chat/lobby/", {
    onOpen: () => {
      sendJsonMessage({ command: "fetch_messages", from: "admin" });
    },
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => {
      console.log(JSON.parse(event.data));
    },
  });

  // const po = socketio("http://127.0.0.1:9500/ws/chat/lobby/");
  // console.log(po);
  // socket connection to http://127.0.0.1:9500/ws/chat/lobby/
  //   const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  //   const [messages, setMessages] = useState([]);
  //   useEffect(() => {
  //     const chatSocket = new WebSocket(
  //       "ws://" + "127.0.0.1:9500" + "/ws/chat/lobby/"
  //     );
  //     chatSocket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       setMessages((prevMessages) => [...prevMessages, data]);
  //     };
  //     setSocket(chatSocket);
  //   }, []);

  const submitMessage = (event) => {
    console.log("sending message");
    event.preventDefault();
    const messageObject = {
      command: "new_message",
      message: message,
      from: "admin",
    };
    sendJsonMessage(messageObject);
    setMessage("");
  };
  //   const fetchMessages = (event) => {
  //     console.log("fetching messages");
  //     const messageObject = {
  //       command: "fetch_messages",
  //     };
  //     socket.send(JSON.stringify(messageObject));
  //     setMessage("");
  //   };
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://use.typekit.net/hoy3lrg.js"></script>
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
      />
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css"
      />
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <link
        href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <div id={classes.frame}>
        <div id={classes.sidepanel}>
          <div id={classes.profile}>
            <div class={classes.wrap}>
              <img
                id={classes["profile-img"]}
                src="http://emilcarlsson.se/assets/mikeross.png"
                class={classes.online}
                alt=""
              />
              <p>Mike Ross</p>
              <i
                class="fa fa-chevron-down expand-button"
                aria-hidden="true"
              ></i>
              <div id={classes["status-options"]}>
                <ul>
                  <li id={classes["status-online"]} class={classes.active}>
                    <span class={classes["status-circle"]}></span>
                    <p>Online</p>
                  </li>
                  <li id="status-away">
                    <span class={classes["status-circle"]}></span>
                    <p>Away</p>
                  </li>
                  <li id="status-busy">
                    <span class={classes["status-circle"]}></span>
                    <p>Busy</p>
                  </li>
                  <li id={classes["status-offline"]}>
                    <span class="status-circle"></span>
                    <p>Offline</p>
                  </li>
                </ul>
              </div>
              <div id={classes.expanded}>
                <label for="twitter">
                  <i class="fa fa-facebook fa-fw" aria-hidden="true"></i>
                </label>
                <input name="twitter" type="text" value="mikeross" />
                <label for="twitter">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </label>
                <input name="twitter" type="text" value="ross81" />
                <label for="twitter">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </label>
                <input name="twitter" type="text" value="mike.ross" />
              </div>
            </div>
          </div>
          <div id={classes.search}>
            <label for="">
              <i class="fa fa-search" aria-hidden="true"></i>
            </label>
            <input type="text" placeholder="Search contacts..." />
          </div>
          <div id={classes.contacts}>
            <ul>
              <li class={classes.contact}>
                <div class={classes.wrap}>
                  <span
                    class={`${classes["contact-status"]} ${classes["online"]}`}
                  ></span>
                  <img
                    src="http://emilcarlsson.se/assets/louislitt.png"
                    alt=""
                  />
                  <div class={classes.meta}>
                    <p class={classes.name}>Louis Litt</p>
                    <p class={classes.preview}>You just got LITT up, Mike.</p>
                  </div>
                </div>
              </li>
              <li class={`${classes["contact"]} ${classes["active"]}`}>
                <div class={classes.wrap}>
                  <span
                    class={`${classes["contact-status"]} ${classes["busy"]}`}
                  ></span>
                  <img
                    src="http://emilcarlsson.se/assets/harveyspecter.png"
                    alt=""
                  />
                  <div class={classes.meta}>
                    <p class={classes.name}>Harvey Specter</p>
                    <p class={classes.preview}>
                      Wrong. You take the gun, or you pull out a bigger one. Or,
                      you call their bluff. Or, you do any one of a hundred and
                      forty six other things.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div id={classes["bottom-bar"]}>
            <button id={classes.addcontact}>
              <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>
              <span>Add contact</span>
            </button>
            <button id={classes.settings}>
              <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
              <span>Settings</span>
            </button>
          </div>
        </div>
        <div class={classes.content}>
          <div class={classes["contact-profile"]}>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>ADHAM</p>
            <div class={classes["social-media"]}>
              <i class="fa fa-facebook" aria-hidden="true"></i>
              <i class="fa fa-twitter" aria-hidden="true"></i>
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </div>
          </div>
          <div class={classes.messages}>
            <ul id={classes["chat-log"]}>
              <li class={classes.sent}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                <p>
                  How the hell am I supposed to get a jury to believe you when I
                  am not even sure that I do?!
                </p>
              </li>
              <li class={classes.replies}>
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>
                  When you're backed against the wall, break the god damn thing
                  down.
                </p>
              </li>
            </ul>
          </div>
          <div class={classes["message-input"]}>
            <div class={classes.wrap}>
              <input
                id={classes["chat-message-input"]}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Write your message..."
              />
              <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
              <button
                id={classes["chat-message-submit"]}
                class={classes.submit}
                onClick={submitMessage}
              >
                <i class="fa fa-paper-plane fa-fw" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Messages;
