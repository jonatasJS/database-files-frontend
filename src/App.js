import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Home from "./pages/Home";
import ListFiles from "./pages/ListFiles";

import { Container, CopyrighArea, CopyrighText, Footer } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import Login from "./pages/Login";
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

  componentDidMount() {
    setInterval(() => {
      if (this.state.pathname !== window.location.pathname) {
        this.setState({ pathname: window.location.pathname });
      }
    }, 10)
    // verifica se o token no localStorage é valido
    if (localStorage.getItem("token")) {
      api.post("/validatetoken", {
        token: localStorage.getItem("token"),
      }).then((res) => {
        console.log(res);
        if (res.data.error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userdata");
          this.setState({ isLogged: false });
          return window.location.href = "/login";
        } else {
          this.setState({ isLogged: true });
          this.setState({ userdata: res.data.user });
        }
      });
    }
    

    // if(localStorage.getItem('token') === null) {
    //   window.location.href = '/login';
    // }
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
            <Route
              path="/"
              exact
              element={this.state.isLogged ? <Home /> : <Login />}
            />
            <Route
              path="/files"
              exact
              element={this.state.isLogged ? <ListFiles /> : <Login />}
            />
            <Route path="/login" exact element={<Login />} />
            <Route
              path="*"
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
