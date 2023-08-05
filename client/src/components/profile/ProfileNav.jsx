const activeBtnStyles =
  'bg-green-500 text-white font-semibold mr-4 p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-secondaryColor text-black font-semibold mr-4 p-2 rounded-full w-20 outline-none';

function ProfileNav({ activeButton, setActiveButton, setText }) {
  return (
    <div className="mb-7 text-center">
      <button
        type="button"
        onClick={(e) => {
          setText(e.target.textContent);
          setActiveButton('created');
        }}
        className={
          activeButton === 'created' ? activeBtnStyles : notActiveBtnStyles
        }
      >
        Created
      </button>

      <button
        type="button"
        onClick={(e) => {
          setText(e.target.textContent);
          setActiveButton('saved');
        }}
        className={
          activeButton === 'saved' ? activeBtnStyles : notActiveBtnStyles
        }
      >
        Saved
      </button>
    </div>
  );
}

export default ProfileNav;
