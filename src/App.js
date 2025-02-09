import { useState } from "react";

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

//* GLAVNA STRANICA FORUMA, KREIRANE KATEGORIJE, RAZGOVORI, NOVE PORUKE
function Topics({ topicsName }) {
  const [messages, newMessages] = useState([]);

  const createNewMessage = function () {
    newMessages([...messages, ""]);
  };

  return (
    <div className="topics">
      {topicsName && (
        <>
          <div className="topicsHeader">
            <h3>{topicsName}</h3>
            <button id="startNewTopics" onClick={() => createNewMessage()}>
              New Message
            </button>
          </div>
          <div className="topicsBody">
            {messages.map((_, i) => (
              <div className="areaInput" key={i}>
                <textarea></textarea>
                <div className="areaSocial">
                  <button>
                    <p>👍</p>
                  </button>
                  <button>♥️</button>
                  <button>💬</button>
                </div>
              </div>
            ))}
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

  //* Potvrđivanje forme, ispitivanje podudarnosti passworda
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "register" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit(formData);
  };

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
