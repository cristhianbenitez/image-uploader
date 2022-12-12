import React from 'react';
function App() {
  const [image, setImage] = React.useState({ preview: '', data: '' });
  const [status, setStatus] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    const response = await fetch('http://localhost:3000/image', {
      method: 'POST',
      body: formData
    });
    if (response) setStatus(response.statusText);
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

  console.log(image);
  return (
    <div className="App">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
