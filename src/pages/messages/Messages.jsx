import React, { useEffect, useState, useRef } from "react";
import "./Messages.module.css";
import classes from "./Messages.module.css";
import useWebSocket from "react-use-websocket";
import {
  getUserData,
  getChatContacts,
  getContactDetail,
  getAllContacts,
  createChat,
  searchContacts,
} from "../../utils/getData";

export default function Messages() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [tempContacts, setTempContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatID, setChatID] = useState(1);
  const [mode, setMode] = useState("contacts");
  const [messages, setMessages] = useState({});
  const lastRef = useRef(null);
  const createAndJoin = async (contact) => {
    try {
      const response = await createChat(contact);
      setMode("contacts");
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      if (response.status === 200) {
        const userData = response.result;
        if (userData) {
          setUserData(userData);
        }
      } else {
        console.log("Error: ", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getContacts = async () => {
    try {
      setLoading(true);
      const response = await getChatContacts();
      if (response.status === 200) {
        setLoading(false);
        const contacts = response.result;
        if (contacts) {
          setContacts(contacts);
          setTempContacts(contacts);
        }
      } else {
        setLoading(false);
        console.log("Error: ", response.status);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const getAll = async () => {
    try {
      setLoading(true);
      const response = await getAllContacts();
      if (response.status === 200) {
        setLoading(false);
        const contacts = response.result;
        if (contacts) {
          setContacts(contacts);
        }
      } else {
        setLoading(false);
        console.log("Error: ", response.status);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (lastRef.current && messages.length != 0 && !loading) {
      lastRef.current.scrollIntoView();
    }
  }, [messages]);
  useEffect(() => {
    console.log("useEffect");
    fetchUserData();
  }, []);

  useEffect(() => {
    if (mode == "contacts") {
      getContacts();
    } else {
      getAll();
    }
  }, [mode]);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket("ws://127.0.0.1:8000/ws/chat/" + chatID + "/", {
    onOpen: () => {
      sendJsonMessage({ command: "fetch_messages", from: userData.username });
    },
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => {
      let eventData = JSON.parse(event.data);
      if (eventData.command == "new_message" && eventData.messages) {
        setMessages(eventData.messages);
      } else {
        setMessages((prev) => {
          console.log(prev);
          return [...prev, eventData.message];
        });
      }
    },
  });
  const submitMessage = (event) => {
    event.preventDefault();
    if (message.trim().length == 0) {
      return;
    }
    const messageObject = {
      command: "new_message",
      message: message.trim(),
      from: userData.username,
    };
    sendJsonMessage(messageObject);
    lastRef.current.scrollIntoView();
    setMessage("");
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(userData);
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
                src={`${userData.profile_picture}`}
                class={classes.online}
                alt=""
              />
              <p>
                {userData.first_name} {userData.last_name}
              </p>
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
          {mode == "add" && (
            <div id={classes.search}>
              <label for="">
                <i class="fa fa-search" aria-hidden="true"></i>
              </label>
              <input
                onChange={async (e) => {
                  let result = await searchContacts(e.target.value);
                  setContacts(result.result);
                }}
                type="text"
                placeholder="Search contacts..."
              />
            </div>
          )}
          <div id={classes.contacts}>
            <ul>
              {contacts.map((contact, index) => {
                return (
                  <li class={classes.contact}>
                    <div class={classes.wrap}>
                      <span
                        class={`${classes["contact-status"]} ${classes["online"]}`}
                      ></span>
                      {contact?.participants &&
                        contact.participants.map((participant) => {
                          if (participant.id != userData.id) {
                            return (
                              <>
                                <img src={participant.profile_pic} alt="" />
                                <div
                                  onClick={() => {
                                    setChatID(contact.id);
                                  }}
                                  class={classes.meta}
                                >
                                  <p class={classes.name}>
                                    {participant.first_name}{" "}
                                    {participant.last_name}
                                  </p>
                                </div>
                              </>
                            );
                          }
                        })}
                      {contact?.user && (
                        <>
                          <>
                            <img src={contact.user.profile_pic} alt="" />
                            <div
                              class={classes.meta}
                              onClick={() => {
                                createAndJoin(contact.id);
                              }}
                            >
                              <p class={classes.name}>
                                {contact.user.first_name}{" "}
                                {contact.user.last_name}
                              </p>
                            </div>
                          </>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div id={classes["bottom-bar"]}>
            <button
              id={classes.addcontact}
              onClick={() => {
                mode === "contacts" ? setMode("add") : setMode("contacts");
              }}
            >
              <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>
              <span>{mode === "contacts" ? "Add" : "View"} contact</span>
            </button>
          </div>
        </div>
        <div class={classes.content}>
          <div class={classes["contact-profile"]}>
            <img
              src={
                tempContacts
                  .find((contact) => contact.id == chatID)
                  ?.participants.find(
                    (participant) => participant.id != userData.id
                  ).profile_pic
              }
              alt=""
            />
            <p>
              {
                tempContacts
                  .find((contact) => contact.id == chatID)
                  ?.participants.find(
                    (participant) => participant.id != userData.id
                  ).first_name
              }{" "}
              {
                tempContacts
                  .find((contact) => contact.id == chatID)
                  ?.participants.find(
                    (participant) => participant.id != userData.id
                  ).last_name
              }
            </p>
          </div>
          <div class={classes.messages}>
            <ul id={classes["chat-log"]}>
              {messages.length > 0 &&
                messages.map((message, index) => {
                  if (message.author == userData.username) {
                    return (
                      <>
                        <li class={classes.sent}>
                          <img src={userData.profile_picture} alt="" />
                          <p>{message.content}</p>
                        </li>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <li class={classes.replies}>
                          <img
                            src={
                              tempContacts
                                .find((contact) => contact.id == chatID)
                                ?.participants.find(
                                  (participant) => participant.id != userData.id
                                ).profile_pic
                            }
                            alt=""
                          />
                          <p>{message.content}</p>
                        </li>
                      </>
                    );
                  }
                })}
              {messages.length > 0 && (
                <li ref={lastRef} id="dummy" class={classes.replies}>
                  <p></p>
                </li>
              )}
            </ul>
          </div>
          <div class={classes["message-input"]}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitMessage();
              }}
              class={classes.wrap}
            >
              <input
                id={classes["chat-message-input"]}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                type="text"
                placeholder="Write your message..."
              />
              <button
                id={classes["chat-message-submit"]}
                class={classes.submit}
                onClick={submitMessage}
              >
                <i class="fa fa-paper-plane fa-fw" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
