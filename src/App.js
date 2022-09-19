import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Home from "./pages/Home";
import ListFiles from "./pages/ListFiles";
import Login from "./pages/Login";
import Reset from "./pages/Reset";

import { Container, CopyrighArea, CopyrighText, Footer } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import { ToastContainer } from "react-toastify";
import api from "./services/api";

class App extends Component {
  state = {
    pathname: window.location.pathname,
    isLogged: false,
    userdata: {
      name: null,
      email: null,
      _id: null,
    },
  };

  // componentDidUpdate() {

  // }

  async componentDidMount() {
    const time = setInterval(() => {
      if (this.state.pathname !== window.location.pathname) {
        this.setState({ pathname: window.location.pathname });
      } else {
        clearInterval(time);
      }
    }, 10);
    // verifica se o token no localStorage é valido
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname.includes("/reset") === false
    ) {
      const token = localStorage.getItem("token");

      if (token) {
        await api
          .post("/validatetoken", {
            token: localStorage.getItem("token"),
          })
          .then((res) => {
            this.setState({ isLogged: true });
            this.setState({ userdata: res.data.user });
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("userdata");
            this.setState({ isLogged: false });
            return (window.location.href = "/login");
          });
      } else {
        this.setState({ isLogged: false });
        return (window.location.href = "/login");
      }
    }
  }

  render() {
    return (
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: this.state.pathname === "/files" ? "95%" : "400px",
          height: this.state.pathname === "/files" ? "65%" : "auto",
          marginTop: this.state.pathname === "/files" ? "-100px" : "-100px",
        }}
      >
        {this.state.userdata._id && (
          <motion.div
            className="photo-profile"
            initial={{
              opacity: 0,
              right: 0,
              top: 0,
              zIndex: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              right: 10,
              top: 10,
              zIndex: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              right: 0,
              top: 0,
              zIndex: 0,
              height: 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              display: window.localStorage.getItem("token") ? "block" : "none",
              height: "50px",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userdata");
              window.location.href = "/login";
            }}
          >
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                border: "1px solid #fff",
                cursor: "pointer",
              }}
              src={`https://github.com/${this.state.userdata.username}.png`}
              alt="Profile"
            />
          </motion.div>
        )}
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/files" exact element={<ListFiles />} />
            <Route path="/login" exact element={<Login />} />
            <Route
              path="*"
              exact
              element={
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    backgroundColor: "#fff",
                    color: "#000",
                    width: "100%",
                  }}
                >
                  404
                </h1>
              }
            />
            <Route path="reset/:token" exact element={<Reset />} />
          </Routes>
        </Router>
        <ToastContainer />
        <Footer>
          <CopyrighArea>
            <CopyrighText>
              <p>
                Copyright &copy; 2022 - {new Date().getFullYear()}
                <br />
                All Right Reserved <a href="https://jonatas.app/">Jônatas</a>
              </p>
            </CopyrighText>
          </CopyrighArea>
        </Footer>
      </Container>
    );
  }
}

export default App;
