import React, { Component } from "react";
import * as CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, FileInfoData, ItensStatus, Preview } from "./styles";

export default class FileList extends Component {
  render() {
    return (
      <Container>
        {this.props.files.map(
          ({
            id,
            name,
            readableSize,
            preview,
            progress,
            uploaded,
            error,
            url,
          }) => {
            return (
              <li key={`${id}`}>
                <FileInfo>
                  <Preview src={preview} />
                  <FileInfoData>
                    <strong>{name}</strong>
                    <span>
                      {readableSize}{" "}
                      {!!url && (
                        <button onClick={() => this.props.onDelete(id)}>
                          Excluir
                        </button>
                      )}
                    </span>
                  </FileInfoData>
                </FileInfo>

                <main>
                  {!uploaded && !error ? (
                    <CircularProgressbar
                      styles={{
                        root: { width: 24 },
                        path: { stroke: "#7159c1" },
                      }}
                      strokeWidth={10}
                      percentage={progress}
                    />
                  ) : (
                    ""
                  )}

                  <ItensStatus>
                    {url && (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <MdLink
                          style={{ marginRight: 8 }}
                          size={24}
                          color="#222"
                        />
                      </a>
                    )}

                    {uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                    {error && <MdError size={24} color="#e57878" />}
                  </ItensStatus>
                </main>
              </li>
            );
          }
        )}
      </Container>
    );
  }
}
