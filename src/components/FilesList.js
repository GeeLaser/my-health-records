import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import Login from '../components/Login/login';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState();

  
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  if(!token) {
    return <Login setToken={setToken} />
  }

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  const deleteFile = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/delete/${id}`)
      .then (response => {
        if(response.status === 'error'){
          console.log('err');
        } else axios.get(`${API_URL}/files`);
      });
      
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download / 
                    </a>
                    <a
                      href="#/"
                      onClick={() =>
                        deleteFile(_id)
                      }
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <form action="/upload" method="POST" enctype="multipart/form-data" >
      <div class="file-field input-field">
        <div class="btn grey">
          <span>File</span>
          <input name="myImage" type="file" multiple="multiple"/> 
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text"/>
        </div>

      </div>      
      <button type="submit" class="btn">Submit</button>
    </form>
    </div>
  );
};

export default FilesList;
