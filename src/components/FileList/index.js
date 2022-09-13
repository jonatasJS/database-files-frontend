import React, { Component } from "react";
import * as CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, FileInfoData, Preview } from "./styles";

export default class FileList extends Component {
  teste = () => {
    console.log("teste");
  };

  render() {
    const { files, onDelete } = this.props;
    return (
      <Container>
        {this.teste()}
        {files.map((uploadedFile) => (
          <li key={uploadedFile.id}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <FileInfoData>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}{" "}
                  {!!uploadedFile.url && (
                    <button onClick={() => onDelete(uploadedFile.id)}>
                      Excluir
                    </button>
                  )}
                </span>
              </FileInfoData>
            </FileInfo>

            <div>
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: "#7159c1" },
                  }}
                  strokeWidth={10}
                  percentage={uploadedFile.progress}
                />
              )}

              {uploadedFile.url && (
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </Container>
    );
  }
}
