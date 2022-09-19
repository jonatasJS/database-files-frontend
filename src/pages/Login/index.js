import { Component } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import api from "../../services/api.js";

import { LoginPage, Form, FormMessage, ResetPassword } from "./styles.js";

export default class Login extends Component {
  state = {
    formType: "login",
    loginData: {
      username: null,
      password: null,
    },
    registerData: {
      username: null,
      password: null,
      email: null,
    },
    resetData: {
      email: null,
    },
  };

  handleLogin = async () => {
    if (
      this.state.loginData.username === "" ||
      this.state.loginData.password === "" ||
      this.state.loginData.username === null ||
      this.state.loginData.password === null
    )
      return toast.error("Preencha todos os campos!");

    await api
      .post("/authenticate", {
        username: this.state.loginData.username,
        password: this.state.loginData.password,
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
        toast.error("Username ou senha incorretos");
      });
  };

  handleRegister = async () => {
    // verificar se os campos estão preenchidos
    if (
      this.state.registerData.username === "" ||
      this.state.registerData.password === "" ||
      this.state.registerData.email === "" ||
      this.state.registerData.username === null ||
      this.state.registerData.password === null ||
      this.state.registerData.email === null
    )
      return toast.error("Preencha todos os campos!");

    // verifica se o campo username tem espaço
    if (this.state.registerData.username.includes(" ")) {
      return toast.error("O campo username não pode conter espaços!");
    }

    await api
      .post("/registeruser", {
        username: this.state.registerData.username,
        email: this.state.registerData.email,
        password: this.state.registerData.password,
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
        toast.error("Username ou email já cadastrado");
      });
  };

  handleSendEmailResetPassword = async () => {
    try {
      if (
        this.state.resetData.email === "" ||
        this.state.resetData.email === null
      ) return toast.error("Preencha todos os campos!");

      await api
        .get(`/sendemailresetpassword/${this.state.resetData.email}`)
        .then((response) => {
          if (response.data.error) return toast.error(response.data.error);
          if (response.request.status === 200) {
              toast.success("Email enviado com sucesso!");
              this.setState({ formType: "login" });
          }
        })
        .catch(({ response }) => {
          console.log(response.data);
          toast.error(response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
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
            {this.state.formType === "login"
              ? "Login"
              : this.state.formType === "register"
              ? "Crie sua conta"
              : "Recuperar senha"}
          </h1>
          {this.state.formType === "register" && (
            <form className="register-form">
              <input
                type="text"
                placeholder="name"
                autoFocus={this.state.formType === "register" ? true : false}
                onChange={(e) =>
                  this.setState({
                    registerData: {
                      ...this.state.registerData,
                      username: e.target.value,
                    },
                  })
                }
              />
              <input
                type="email"
                placeholder="email address"
                onChange={(e) =>
                  this.setState({
                    registerData: {
                      ...this.state.registerData,
                      email: e.target.value,
                    },
                  })
                }
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) =>
                  this.setState({
                    registerData: {
                      ...this.state.registerData,
                      password: e.target.value,
                    },
                  })
                }
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handleRegister();
                }}
              >
                create
              </button>
              <FormMessage>
                <span
                  onClick={() =>
                    this.setState({
                      formType: "login",
                    })
                  }
                >
                  <BsArrowLeft
                    style={{
                      marginRight: "5px",
                    }}
                  /> {" "}
                  Voltar para login
                </span>
              </FormMessage>
            </form>
          )}
          {this.state.formType === "login" && (
            <form>
              <input
                type="text"
                autoFocus={this.state.formType === "login" ? true : false}
                placeholder="username"
                onChange={(e) =>
                  this.setState({
                    loginData: {
                      ...this.state.loginData,
                      username: e.target.value,
                    },
                  })
                }
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) =>
                  this.setState({
                    loginData: {
                      ...this.state.loginData,
                      password: e.target.value,
                    },
                  })
                }
              />
              <ResetPassword
                onClick={() => {
                  this.setState({
                    formType: "reset",
                  });
                }}
              >
                Esqueci a senha
              </ResetPassword>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handleLogin(this.state.username, this.state.password);
                }}
              >
                login
              </button>
              <FormMessage>
                Não tem uma conta?{" "}
                <span
                  onClick={() =>
                    this.setState({
                      formType: "register",
                    })
                  }
                >
                  Registre-se
                </span>
              </FormMessage>
            </form>
          )}
          {this.state.formType === "reset" && (
            <form>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => {
                  console.log(e.target.value);
                  this.setState({
                    resetData: {
                      ...this.state.resetData,
                      email: e.target.value,
                    },
                  });
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handleSendEmailResetPassword();
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
          )}
        </Form>
      </LoginPage>
    );
  }
}
