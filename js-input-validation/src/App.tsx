import React, { useState } from "react";

const App: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const disabled =
    password &&
    passwordErrorMessage === "" &&
    username &&
    usernameErrorMessage === "" &&
    email &&
    emailErrorMessage === ""
      ? false
      : true;

  function inputHandler(inputContent: string, item: string) {
    if (item === "password") {
      setPassword(inputContent);
      passwordValidator(inputContent);
    } else if (item === "username") {
      setUsername(inputContent);
      usernameValidator(inputContent);
    } else if (item === "email") {
      setEmail(inputContent);
      emailValidator(inputContent);
    }
  }

  function passwordValidator(inputPassword: string) {
    const uppercase = /[A-Z]/g;
    const foundForUppercase = inputPassword.match(uppercase);

    const symbol = /[!#$%&¥|@?]/g;
    const foundForSymbol = inputPassword.match(symbol);

    const hyphen = /-/g;
    const foundForHyphen = inputPassword.match(hyphen);

    if (foundForUppercase && foundForHyphen && foundForSymbol) {
      if (foundForUppercase.length >= 5 && foundForSymbol.length >= 6 && foundForHyphen.length >= 2) {
        setPasswordErrorMessage("");
      } else {
        setPasswordErrorMessage("少なくとも[5つの大文字]と[6つの記号]、[2つのハイフン]を使ってください");
      }
    } else {
      setPasswordErrorMessage("少なくとも[5つの大文字]と[6つの記号]、[2つのハイフン]を使ってください");
    }
  }

  function usernameValidator(inputUsername: string) {
    const regex = /[\s]/;
    const found = inputUsername.match(regex);
    if (found) {
      setUsernameErrorMessage("usernameにスペースを使わないでください");
    } else {
      setUsernameErrorMessage("");
    }
  }

  function emailValidator(inputEmail: string) {
    const domain = "@gmail.com";
    if (inputEmail.endsWith(domain)) {
      setEmailErrorMessage("");
    } else {
      setEmailErrorMessage("gmailのメールアドレスを入力してください");
    }
  }

  return (
    <>
      <p>
        password<input onChange={(e) => inputHandler(e.target.value, "password")} value={password}></input>
      </p>
      <p>{passwordErrorMessage}</p>
      <p>
        username<input onChange={(e) => inputHandler(e.target.value, "username")} value={username}></input>
      </p>
      <p>{usernameErrorMessage}</p>
      <p>
        email<input onChange={(e) => inputHandler(e.target.value, "email")} value={email}></input>
      </p>
      <p>{emailErrorMessage}</p>
      <button disabled={disabled}>submit</button>
    </>
  );
};

export default App;
