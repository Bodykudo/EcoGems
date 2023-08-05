import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { client } from '../../client';
import { categories } from '../../utils/api';

function CreateGemForm({ user, imageAsset, isLoading, setFields }) {
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { category: '' },
  });
  const { errors } = formState;

  const navigate = useNavigate();

  function saveGem({ title, about, destination, category }) {
    if (imageAsset?._id) {
      setIsSaving(true);
      const newGem = {
        _type: 'gem',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        category,
      };

      client.create(newGem).then(() => navigate('/'));
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  }

  return (
    <div className="m5-5 flex w-full flex-1 flex-col gap-6 dark:text-gray-300 lg:pl-5">
      <input
        type="text"
        id="title"
        placeholder="Add your title here"
        disabled={isSaving}
        className="border-b-2 border-gray-200 p-2 text-2xl font-bold outline-none dark:border-gray-700 dark:bg-gray-900 sm:text-3xl"
        {...register('title', {
          required: 'This field is required',
        })}
      />
      {errors?.title && (
        <p className="-mt-5 text-sm font-semibold text-red-500 dark:text-red-600">
          {errors?.title?.message}
        </p>
      )}

      {user && (
        <div className="my-2 flex items-center gap-2 rounded-lg bg-white p-1.5 dark:bg-gray-900">
          <img
            src={user?.image}
            className="h-10 w-10 rounded-full dark:opacity-70"
            alt="user-profile"
          />
          <p className="font-bold">{user?.userName}</p>
        </div>
      )}

      <input
        type="text"
        id="about"
        placeholder="What is your gem about?"
        disabled={isSaving}
        className="border-b-2 border-gray-200 p-2 text-base outline-none dark:border-gray-700 dark:bg-gray-900 sm:text-lg"
        {...register('about', {
          required: 'This field is required',
        })}
      />
      {errors?.about && (
        <p className="-mt-5 text-sm font-semibold text-red-500 dark:text-red-600">
          {errors?.about?.message}
        </p>
      )}

      <input
        type="text"
        id="destination"
        placeholder="Add a destination link"
        disabled={isSaving}
        className="border-b-2 border-gray-200 p-2 text-base outline-none dark:border-gray-700 dark:bg-gray-900 sm:text-lg"
        {...register('destination', {
          pattern: {
            value:
              /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w\u200C\u200B.-]*)*\/?$/i,
            message: 'Invalid URL',
          },
        })}
      />
      {errors?.destination && (
        <p className="-mt-5 text-sm font-semibold text-red-500 dark:text-red-600">
          {errors?.destination?.message}
        </p>
      )}

      <div className="flex flex-col">
        <div>
          <p className="mb-2 text-lg font-semibold sm:text-xl">
            Choose Gem Category
          </p>
          <select
            id="category"
            disabled={isSaving}
            className={`w-4/5 rounded-md border-b-2 border-gray-200 p-2 text-base outline-none dark:border-gray-700 dark:bg-gray-900 ${
              isSaving ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            {...register('category', {
              required: 'You must select a category',
            })}
          >
            <option
              value=""
              disabled
              className="sm:text-bg bg-white dark:bg-gray-800 dark:text-gray-300"
            >
              Select Category
            </option>

            {categories.map((category) => (
              <option
                className="outline-non border-0 bg-white text-base capitalize text-black dark:bg-gray-800 dark:text-gray-300"
                value={category.name}
                key={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
          {errors?.category && (
            <p className="text-sm font-semibold text-red-500 dark:text-red-600">
              {errors?.category?.message}
            </p>
          )}
        </div>

        <div className="mt-5 flex items-end justify-end">
          <button
            type="button"
            className={`w-28 rounded-full bg-green-500 p-2 font-bold text-white outline-none transition-all duration-200 dark:bg-darkGreen ${
              isSaving ||
              (isLoading ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80')
            }`}
            onClick={handleSubmit(saveGem)}
            disabled={isSaving || isLoading}
          >
            Save Gem
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGemForm;
