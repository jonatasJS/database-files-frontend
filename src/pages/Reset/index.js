import { Component } from "react";
import { toast } from "react-toastify";
import api from "../../services/api.js";

import { LoginPage, Form, FormMessage } from "./styles.js";

export default class Login extends Component {
  state = {
    password: null,
    confimPassword: null,
  };

  async componentDidMount() {
    const token = window.location.href.split("/")[4];

    await api.get("/user/" + token).catch(async (_) => {
      if (_.request.status === 400 || _.request.status === 404) {
        toast.error("Token inválido", {
          theme: "dark",
        });
        return (window.location.href = "/login");
      }
    });
  }

  handleResetPassword = async () => {
    if (
      this.state.password === "" ||
      this.state.confimPassword === "" ||
      this.state.password === null ||
      this.state.confimPassword === null
    ) return toast.error("Preencha todos os campos!", {
      theme: "dark",
    });

    if (this.state.password !== this.state.confimPassword) return toast.error("As senhas não coincidem!", {
      theme: "dark",
    });

    // pegar o token da url
    const token = window.location.href.split("/")[4];

    await api
      .post("/resetpass", {
        token,
        password: this.state.password,
        confimPassword: this.state.confimPassword,
      })
      .then(async (response) => {
        if (response.data.token) {
          await localStorage.setItem(
            "userdata",
            JSON.stringify(response.data.user)
          );
          await localStorage.setItem("token", response.data.token);
          return (window.location.href = "/");
        }
      })
      .catch(({ response }) => {
        console.log(response.data);
        toast.error("Algo deu Errado!", {
          theme: "dark",
        });
      });
  };

  render() {
    return (
      <LoginPage>
        <Form>
          <h1
            style={{
              color: "#fff",
              fontSize: "2.5rem",
              marginBottom: "20px",
              textAlign: "center",
              marginTop: "-20px",
            }}
          >
            Reset
          </h1>
          <form>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({
                  password: e.target.value,
                });
              }}
            />
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({
                  confimPassword: e.target.value,
                });
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                this.handleResetPassword();
              }}
            >
              reset
            </button>
            <FormMessage>
              <span
                onClick={() =>
                  this.setState({
                    formType: "login",
                  })
                }
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Voltar
              </span>
            </FormMessage>
          </form>
        </Form>
      </LoginPage>
    );
  }
}
