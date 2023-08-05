import { useState } from 'react';
import { client } from '../../client';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Spinner from '../ui/Spinner';

const validImageTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/svg',
  'image/gif',
  'image/tiff',
];

function ImageUpload({
  fields,
  imageAsset,
  setImageAsset,
  isLoading,
  setIsLoading,
}) {
  const [wrongImageType, setWrongImageType] = useState(false);

  function uploadImage(e) {
    const selectedFile = e.target.files[0];

    if (validImageTypes.includes(selectedFile?.type)) {
      setWrongImageType(false);
      setIsLoading(true);

      client.assets
        .upload('image', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setIsLoading(false);
        })
        .catch((error) => console.log('Image uploading error ', error));
    } else {
      setWrongImageType(true);
    }
  }

  return (
    <div className="flex w-full flex-0.7 bg-secondaryColor p-3">
      <div className="flex h-340 w-full flex-col items-center justify-center border-2 border-dotted border-gray-300 p-3 lg:h-[60vh]">
        {isLoading && <Spinner />}
        {wrongImageType && (
          <p className="text-lg text-red-500">Wrong file type</p>
        )}
        {fields && (
          <p className="text-lg text-red-500">
            Please upload an image for your gem
          </p>
        )}
        {!imageAsset ? (
          <label>
            <div
              className={`flex h-full flex-col items-center justify-center ${
                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold">
                  <AiOutlineCloudUpload size={60} />
                </p>
                <p className="text-lg">Click to upload</p>
              </div>
              <p className="mt-16 text-center text-gray-400">
                Use high quality JPG, SVG, PNG, or GIF less than 20MB
              </p>
            </div>
            <input
              type="file"
              name="upload-image"
              className="h-0 w-0"
              accept=".png, .jpg, .jpeg, .svg .gif .tiff"
              onChange={uploadImage}
              disabled={isLoading}
            />
          </label>
        ) : (
          <div className="relative h-full">
            <img
              src={imageAsset?.url}
              alt="uploaded-pic"
              className="h-full w-full"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-white p-3 text-xl outline-none transition-all duration-500 hover:shadow-md"
              onClick={() => setImageAsset(null)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
