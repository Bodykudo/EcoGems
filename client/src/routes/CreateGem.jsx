import { useState } from 'react';
import ImageUpload from '../components/createGem/ImageUpload';
import CreateGemForm from '../components/createGem/CreateGemForm';
import { Helmet } from 'react-helmet-async';

function CreateGem({ user }) {
  const [imageAsset, setImageAsset] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState(false);

  return (
    <>
      <Helmet>
        <title>EcoGems - Create Gem</title>
      </Helmet>

      <div className="mt-5 flex flex-col items-center justify-center lg:h-4/5">
        <div className=" flex w-[95%] flex-col items-center justify-center gap-6 bg-white p-3 dark:bg-gray-800 md:w-full lg:h-[75] lg:flex-row lg:p-5">
          <ImageUpload
            fields={fields}
            imageAsset={imageAsset}
            setImageAsset={setImageAsset}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          <CreateGemForm
            user={user}
            imageAsset={imageAsset}
            isLoading={isLoading}
            setFields={setFields}
          />
        </div>
      </div>
    </>
  );
}

export default CreateGem;
