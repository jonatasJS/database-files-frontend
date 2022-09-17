import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import api from "../../services/api";

import { BsArrowDown, BsArrowRight } from "react-icons/bs";

import {
  ArrowDown,
  Content,
  Header,
} from "./styles";
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";

import Upload from "../../components/Upload";
import FileList from "../../components/FileList";

class App extends Component {
  state = {
    uploadedFiles: [],
  };

  async componentDidMount() {
    const response = await api.get("posts");

    this.setState({
      uploadedFiles: response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file?.url,
        url: file?.url,
      })),
    });
  }

  handleUpload = (files) => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
    this.componentDidMount();
  };

  processUpload = async (uploadedFile) => {
    const data = new FormData();

    await data.append("file", uploadedFile.file, uploadedFile.name);

    await api
      .post("posts", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then(async (response) => {
        await this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
        const { data } = await api.get("posts");

        this.setState({
          uploadedFiles: data.map(({ _id, name, size, url }) => ({
            id: _id,
            name: name,
            readableSize: filesize(size),
            preview: url,
            uploaded:
              filesize(size) === uploadedFile.readableSize ? true : false,
            url: url,
          })),
        });

        toast("Upload realizado com sucesso!", {
          type: "success",
          autoClose: 3000,
          theme: "dark",
        });
      })
      .catch((err) => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
        console.log(err);
        toast(`Erro ao realizar upload!\n\nErro: ${err}`, {
          allowHtml: true,
          type: "error",
          autoClose: 3000,
          theme: "dark",
          pauseOnHover: false,
        });
      });
  };

  handleDelete = async (id) => {
    try {
      const fileDeleted = await api.get(`posts/${id}`);
      await api.delete(`posts/${id}`);

      this.setState({
        uploadedFiles: this.state.uploadedFiles.filter(
          (file) => file.id !== id
        ),
      });
      toast(`Arquivo "${fileDeleted.data.name}" deletado com sucesso!`, {
        type: "success",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      toast(`Erro ao deletar arquivo!\n\nErro: ${error}`, {
        allowHtml: true,
        type: "error",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) =>
      URL.revokeObjectURL(file.preview)
    );
  }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <>
        <Header>
          <h1>Guarde seus arquivos na nuvem.</h1>
          <div>
            <ArrowDown teste="0.3">
              <BsArrowDown
                style={{
                  width: "1rem",
                  height: "1rem",
                  marginBottom: "-8px",
                }}
                width={100}
                height={100}
                color="#b29bff"
                strokeWidth={1.5}
              />
            </ArrowDown>
            <ArrowDown teste="0">
              <BsArrowDown
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  marginBottom: "-8px",
                }}
                width={100}
                height={100}
                color="#b29bff"
                strokeWidth={1.5}
              />
            </ArrowDown>
            <ArrowDown teste="0.3">
              <BsArrowDown
                style={{
                  width: "1rem",
                  height: "1rem",
                  marginBottom: "-8px",
                }}
                strokeWidth={1.5}
                color="#b29bff"
                width={100}
                height={100}
              />
            </ArrowDown>
          </div>
        </Header>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <Link
              title="Listas de arquivos"
              to="/files"
            >
              <BsArrowRight
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
                strokeWidth={1.5}
                color="#b29bff"
                width={100}
                height={100}
              />
            </Link>
          </motion.div>
        </Content>
      </>
    );
  }
}

export default App;
