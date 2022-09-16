import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ListFiles from "./pages/ListFiles";

import { Container } from './styles';
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";

class App extends Component {
  state = {
    pathname: window.location.pathname
  }

  render() {
    setInterval(() => {
      this.setState({ pathname: window.location.pathname })
      console.log(this.state.pathname)
    }, 1000);

    return (
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          maxWidth: this.state.pathname === "/files" ? "95%" : "400px",
          height: this.state.pathname === "/files" ? "65%" : "auto",
          top: this.state.pathname === "/files" ? "100px" : "50%",
        }}
      >
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/files" element={<ListFiles />} />
        </Routes>
      </Router>
    </Container>
    );
  }
}

export default App;
