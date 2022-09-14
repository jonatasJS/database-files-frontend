import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "./services/api";
import { BsArrowDown as ArrowDown } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';

import GlobalStyle from "./styles/global";
import { Container, Content, Header } from "./styles";
import 'react-toastify/dist/ReactToastify.css';

import Upload from "./components/Upload";
import FileList from "./components/FileList";

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
        uploaded: true,
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

    (async () => {
      const response = await api.get("posts");
      
      this.setState({
        uploadedFiles: await response.data.map((file) => ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size),
          preview: file.url,
          uploaded: true,
          url: file.url,
        }))
      });
    })();

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
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("posts", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
        toast('Upload realizado com sucesso!', {
          type: 'success',
          autoClose: 3000,
          theme: 'dark',
      });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
        console.log(uploadedFile)
        toast(`Erro ao realizar upload!
        O tipo "${uploadedFile.file.type}" não é suportado!`, {
          type: 'error',
          autoClose: 3000,
          theme: 'dark',
          pauseOnHover: false,
        });
      });
  };

  handleDelete = async (id) => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) =>
      URL.revokeObjectURL(file.preview)
    );
  }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Header>
          <h1>Guarde seus arquivos na nuvem.</h1>
          <div>
            <ArrowDown
              style={{
                width: "1rem",
                height: "1rem",
                marginBottom: "-8px",
              }}
              width={100}
              height={100}
            />
            <ArrowDown
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginBottom: "-8px",
              }}
              teste="1"
              width={100}
              height={100}
            />
            <ArrowDown
              style={{
                width: "1rem",
                height: "1rem",
                marginBottom: "-8px",
              }}
              width={100}
              height={100}
            />
          </div>
        </Header>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
        <GlobalStyle />
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
