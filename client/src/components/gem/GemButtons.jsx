import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../client';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';

function GemButtons({
  user,
  image,
  gemId,
  save,
  destination,
  author,
  saved,
  setSaved,
}) {
  const [isSaving, setIsSaving] = useState(false);

  function saveGem(id) {
    if (!saved) {
      setIsSaving(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          setIsSaving(false);
          setSaved(true);
        });
    }
  }

  function unsaveGem(id) {
    if (saved) {
      setIsSaving(true);
      const newSaveList = save.filter(
        (saveItem) => saveItem.postedBy?._id !== user?.sub
      );
      client
        .patch(id)
        .set({ save: newSaveList })
        .commit()
        .then(() => {
          setIsSaving(false);
          setSaved(false);
        });
    }
  }

  function deleteGem(id) {
    client.delete(id).then(() => window.location.reload());
  }

  function handleSave(e) {
    if (!isSaving) {
      e.stopPropagation();
      saveGem(gemId);
    }
  }

  function handleUnsave(e) {
    e.stopPropagation();
    unsaveGem(gemId);
  }

  function handleDelete(e) {
    e.stopPropagation();
    deleteGem(gemId);
  }

  return (
    <div
      className="absolute top-0 z-50 flex h-full w-full flex-col justify-between p-2"
      style={{ height: '100%' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <a
            href={`${image?.asset?.url}?dl=`}
            download
            className="text-dark outline-non flex  h-9 w-9 items-center justify-center rounded-full bg-white text-xl opacity-75 transition-all duration-200 hover:opacity-100 hover:shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <MdDownloadForOffline />
          </a>
        </div>

        {user &&
          (saved ? (
            <button
              type="button"
              className={`outline:none rounded-3xl bg-green-500 px-5 py-1 text-base font-bold text-white opacity-70 transition-all duration-200 hover:opacity-100 hover:shadow-md ${
                isSaving && 'cursor-not-allowed opacity-100'
              }`}
              onClick={handleUnsave}
              disabled={isSaving}
            >
              {save?.length} Saved
            </button>
          ) : (
            <button
              type="button"
              className={`outline:none rounded-3xl bg-green-500 px-5 py-1 text-base font-bold text-white opacity-70 transition-all duration-200 hover:opacity-100 hover:shadow-md ${
                isSaving && 'cursor-not-allowed opacity-100'
              }`}
              onClick={handleSave}
              disabled={isSaving}
            >
              Save
            </button>
          ))}
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        {destination && (
          <a
            href={destination}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-black opacity-70 transition-all duration-200 hover:opacity-100 hover:shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <BsFillArrowRightCircleFill />{' '}
            {destination.replace(/^https?:\/\//i, '').length > 10
              ? `${destination.replace(/^https?:\/\//i, '').slice(0, 10)}...`
              : destination.replace(/^https?:\/\//i, '')}
          </a>
        )}

        {author?._id === user?.sub && (
          <button
            type="button"
            className="outline:none text-dark rounded-3xl bg-white p-2 text-base font-bold opacity-70 transition-all duration-200 hover:opacity-100 hover:shadow-md"
            onClick={handleDelete}
          >
            <AiTwotoneDelete />
          </button>
        )}
      </div>
    </div>
  );
}

export default GemButtons;
