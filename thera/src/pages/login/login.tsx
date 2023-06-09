import Text from "../../components/atomic/text";
import logo from "./../../assets/img/logo-white.svg";
import style from "./login.module.scss";
import Button from "../../components/atomic/button/button";
import { useState } from "react";
import useApiRequest from "../../hooks/useRequest/useApiRequest";
import { LoginRequest } from "../../apis/request/login/login-request";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { response, post } = useApiRequest();
  const navigate = useNavigate();

  const getLogin = (login: string) => {
    setLogin(login);
  };
  const getPassword = (password: string) => {
    setPassword(password);
  };

  function handleClick() {
    sendData({
      userID: login,
      accessKey: password,
      grantType: "password",
    });
  }

  async function sendData(data: LoginRequest) {
    setLoading(true);
    post("api/accounts", data);
    if (response.name !== "Tulio Chaves") {
      setError("Login ou senha incorretas");
      setLoading(false);
      return;
    }
    navigate("/timeSheet");
  }

  return (
    <div className={style.Logincontainer}>
      <div className={style.modal}>
        <img src={logo} alt="Logo Thera Soluções" className={style.logo} />
        <Text label="Login" class={style.login} onChange={getLogin} />
        <Text
          label="Senha"
          class={style.password}
          onChange={getPassword}
          password
          error={error}
        />
        <Button
          text="ENTRAR"
          class={style.button}
          onClick={() => handleClick()}
          loading={loading}
        />
      </div>
    </div>
  );
}
