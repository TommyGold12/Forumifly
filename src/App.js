import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [openForm, setIsOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  //* OTVARANJE LOGIN/REGISTER FORME
  const openLoginForm = function () {
    setIsOpen(true);
    setFormType("login");
  };
  const openRegisterForm = function () {
    setIsOpen(true);
    setFormType("register");
  };

  //* ZATVARANJE FORME
  const handleCloseForm = function () {
    setIsOpen(false);
  };

  //* UPRAVLJANJE SA LOGIN/REGISTER PODACIMA SA FORME
  const handleLogin = function () {
    setLoginSuccess(true);
  };

  const handleRegister = function () {
    alert("Registrirani ste!");
  };

  return (
    <>
      {!loginSuccess && (
        <MainWallpaper>
          {!openForm ? (
            <LoginBox
              openLoginForm={openLoginForm}
              openRegisterForm={openRegisterForm}
            ></LoginBox>
          ) : (
            <UserForm
              onCloseForm={handleCloseForm}
              type={formType}
              onSubmit={formType === "login" ? handleLogin : handleRegister}
            ></UserForm>
          )}
        </MainWallpaper>
      )}
      {loginSuccess && <MainPage></MainPage>}
    </>
  );
}

//* GLAVNA STRANICA FORUMA, SADRŽI SVE POTREBNE KOMPONENTE U SEBI
function MainPage({ children }) {
  const [inputDataForm, setInputDataForm] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [topicsName, setTopicsName] = useState("");
  const [errMess, setErrMess] = useState("");

  const handleCreateTopics = function (e) {
    e.preventDefault();

    if (dataCategories.includes(inputDataForm.toLowerCase())) {
      handleErrMessage();
    } else {
      setDataCategories([...dataCategories, inputDataForm]);
      setInputDataForm("");
    }
  };

  const handleErrMessage = function () {
    setErrMess("Kategorija već postoji");
    setTimeout(() => setErrMess(""), 1500);
  };

  const handleChange = function (e) {
    setInputDataForm(e.target.value);
  };

  const handleOpenTopics = function (data) {
    setTopicsName(data);
  };

  const handleDeleteTopics = function (dataName) {
    setDataCategories((prev) => prev.filter((topic) => topic !== dataName));

    if (dataName === topicsName) {
      setTopicsName("");
    }
  };

  return (
    <div className="mainPage">
      <div className="container-page">
        <div className="header">
          <h1>🗡️Chatifly🗡️</h1>
        </div>
        <div className="hero">
          <div className="themes">
            <CategoriesForm
              onSubmit={handleCreateTopics}
              onChange={handleChange}
              inputDataForm={inputDataForm}
            ></CategoriesForm>
            <CategoriesList
              openTopics={handleOpenTopics}
              dataCategories={dataCategories}
              deleteTopics={handleDeleteTopics}
              errMess={errMess}
            ></CategoriesList>
          </div>
          <Topics topicsName={topicsName}></Topics>
        </div>
      </div>
    </div>
  );
}

//* INPUT POLJE ZA KREIRANJE KATEGORIJE NA FORUMU
function CategoriesForm({ onSubmit, inputDataForm, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={inputDataForm}
        onChange={onChange}
        required
        name="conversation"
        type="text"
        placeholder="New conversation"
      ></input>
      <button type="submit" id="createConversation">
        Confirm
      </button>
    </form>
  );
}

//* LISTA KATEGORIJA NA FORUMU
function CategoriesList({ dataCategories, openTopics, deleteTopics, errMess }) {
  return (
    <>
      <div className="errMess">{errMess}</div>
      <ul>
        {dataCategories.map((data, i) => (
          <li onClick={() => openTopics(data)} key={i}>
            {data}
            <button
              id="deleteCategory"
              onClick={(e) => {
                e.stopPropagation();
                deleteTopics(data);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/*
  <div className="areaInput" key={i}>
  <textarea></textarea>
  <div className="areaSocial">
    <button>
      <p>👍</p>
    </button>
    <button>♥️</button>
    <button>💬</button> */

//* GLAVNA STRANICA FORUMA, KREIRANE KATEGORIJE, RAZGOVORI, NOVE PORUKE
function Topics({ topicsName }) {
  const [messages, setMessages] = useState([]);

  const createNewMessage = function (e) {
    e.preventDefault();
    const messageValue = e.target.messageInput.value;

    if (messageValue) {
      setMessages((prevMessage) => [
        ...prevMessage,
        { text: messageValue, likes: 0, hearts: 0, comments: 0, reply: [] },
      ]);
    }
    e.target.reset();
  };

  const handleLikes = function (i) {
    const newMessages = [...messages];
    newMessages[i].likes += 1;
    setMessages(newMessages);
  };
  const handleHearts = function (i) {
    const newMessages = [...messages];
    newMessages[i].hearts += 1;
    setMessages(newMessages);
  };
  const handleComments = function (i) {
    const newMessages = [...messages];
    newMessages[i].comments += 1;
    newMessages[i].reply = true;
    setMessages(newMessages);
  };

  return (
    <div className="topics">
      {topicsName && (
        <>
          <div className="topicsHeader">
            <h3>{topicsName}</h3>
          </div>
          <div className="topicsBody">
            {messages.map((msg, i) => (
              <>
                <div className="topicsArea">
                  <div key={i} className="topicsMessage">
                    <p>{msg.text}</p>
                  </div>
                  <div className="topicsSocial">
                    <button onClick={() => handleLikes(i)}>
                      <p>👍{msg.likes}</p>
                    </button>
                    <button onClick={() => handleHearts(i)}>
                      <p>♥️{msg.hearts}</p>
                    </button>
                    <button
                      onClick={() => {
                        handleComments(i);
                      }}
                    >
                      <p>💬{msg.comments}</p>
                    </button>
                  </div>

                  {msg.reply && (
                    <div className="re-topicsMessage">
                      <input placeholder="Reply..."></input>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
          <div className="topicsFooterInput">
            <form onSubmit={(e) => createNewMessage(e)}>
              <textarea
                id="messageInput"
                placeholder="type something..."
              ></textarea>
              <button type="submit" id="startNewTopics">
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

//* FUNKCIJA ZA PRIKAZ CONTAINERA SA FORMAMA
function MainWallpaper({ children }) {
  return (
    <div className="mainWallpaper">
      <div className="container">{children} </div>
    </div>
  );
}
//* ConnectX, Threadly, Chatify
function LoginBox({ openLoginForm, openRegisterForm }) {
  return (
    <div className="main">
      <header>
        <h1>Welcome to Chatify</h1>
        <p>Please sign in to continue</p>
      </header>
      <div className="box">
        <button onClick={() => openLoginForm()}>Login</button>
        <button onClick={() => openRegisterForm()}>Register</button>
      </div>
    </div>
  );
}

function UserForm({ type, onCloseForm, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //* Unos podataka iz inputa u state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //* SUPABASE SERVER
  //* Potvrđivanje forme, ispitivanje podudarnosti passworda, pozivanje supabase servera
  async function handleSubmit(e) {
    console.log(formData.username);
    e.preventDefault();
    if (type === "register" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    //*Slanje obrasca supabase-u
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }

    onSubmit(formData);
  }

  return (
    <>
      <div id="formInput">
        <div>
          <button id="closeFormBtn" onClick={() => onCloseForm()}>
            &larr; Back
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            required
          ></input>
          {type === "register" && (
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            ></input>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
          {type === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            ></input>
          )}
          <button id="signBtn" type="submit">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
