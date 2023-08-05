const activeBtnStyles =
  'bg-green-500 dark:bg-darkGreen text-white font-semibold mr-4 p-2 rounded-full w-20 outline-none dark:text-gray-300 cursor-default';
const notActiveBtnStyles =
  'bg-secondaryColor text-black font-semibold mr-4 p-2 rounded-full w-20 outline-none dark:bg-[#D1D1D1]';

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
