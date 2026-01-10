import { useRef } from "react";

const FileUpload = ({ label, file, onChange }) => {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onChange(droppedFile);
  };

  return (
    <div className="kyc-block">
      <p className="kyc-label">{label}</p>

      <div
        className="upload-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.png,.pdf"
          hidden
          onChange={(e) => onChange(e.target.files[0])}
        />

        {!file ? (
          <>
            <span className="upload-title">Upload or Drag and Drop here</span>
            <span className="upload-sub">Maximum File Size: 20MB</span>
            <span className="upload-types">
              Supported File Types: jpg, png, pdf
            </span>
            <button type="button">Browse Files</button>
          </>
        ) : (
          <div className="file-preview">
            ✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
