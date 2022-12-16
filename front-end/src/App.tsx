import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const SuccessfullyUploaded = ({
  fileName
}: {
  fileName: string;
}): JSX.Element => {
  return (
    <div>
      <img src={`http://localhost:3000/images/${fileName}`} alt="" />
      <div>Uploaded Succesfully</div>
    </div>
  );
};

const App = (): JSX.Element => {
  const [image, setImage] = React.useState({ preview: '', data: '' });
  const [fileName, setFileName] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    const res = await axios.post('http://localhost:3000/image', formData);

    if (res.statusText === 'OK') {
      setStatus(res.statusText);
      setFileName(res.data.filename);
    }
  };

  const handleFileChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      files: any;
    };

    const img = {
      preview: URL.createObjectURL(target.files[0]),
      data: target.files[0]
    };
    setImage(img);
  };

  if (status === 'OK' && fileName.length)
    return <SuccessfullyUploaded fileName={fileName} />;
  return (
    <div className="App">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
