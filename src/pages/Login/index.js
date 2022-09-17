import { Component } from "react";
import { toast } from "react-toastify";
import api from "../../services/api.js";

import { LoginPage, Form, FormMessage } from "./styles.js";

export default class Login extends Component {
  state = {
    formType: "login",
    loginData: {
      username: "",
      password: "",
    },
    registerData: {
      username: "",
      password: "",
      email: "",
    },
  };

  handlelogin = async () => {
    await api
      .post("/authenticate", {
        username: this.state.loginData.username,
        password: this.state.loginData.password,
      })
      .then(async (response) => {
        if (response.data.token) {
          await localStorage.setItem("userdata", JSON.stringify(response.data.user));
          await localStorage.setItem("token", response.data.token);
          return (window.location.href = "/");
        }
      })
      .catch(({ response }) => {
        console.log(response.data);
        toast.error(response.data.error);
      });
  };

  handleRegister = async () => {
    await api
      .post("/registeruser", {
        username: this.state.registerData.username,
        email: this.state.registerData.email,
        password: this.state.registerData.password,
      })
      .then(async (response) => {
        if (response.data.token) {
          await localStorage.setItem("userdata", JSON.stringify(response.data.user));
          await localStorage.setItem("token", response.data.token);
          return (window.location.href = "/");
        }
      })
      .catch(({ response }) => {
        console.log(response.data);
        toast.error(response.data.error);
      });
  };

  render() {
    return (
      <LoginPage>
        <Form>
          {this.state.formType === "register" && (
            <form className="register-form">
              <input
                type="text"
                placeholder="name"
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handleRegister();
                }}
              >create</button>
              <FormMessage>
                Already registered?{" "}
                <span
                  onClick={() =>
                    this.setState({
                      formType: "login",
                    })
                  }
                >
                  Sign In
                </span>
              </FormMessage>
            </form>
          )}
          {this.state.formType === "login" && (
            <form>
              <input
                type="text"
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handlelogin(this.state.username, this.state.password);
                }}
              >
                login
              </button>
              <FormMessage>
                Not registered?{" "}
                <span
                  onClick={() =>
                    this.setState({
                      formType: "register",
                    })
                  }
                >
                  Create an account
                </span>
              </FormMessage>
            </form>
          )}
        </Form>
      </LoginPage>
    );
  }
}