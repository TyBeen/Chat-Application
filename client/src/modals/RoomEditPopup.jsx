export default function RoomEditPopup({
  userData,
  roomToEdit,
  roomsList,
  setEditPopup,
  editPopup,
}) {
  const yourJwtToken = localStorage.getItem("jwtToken");
  const oldRoomName = roomToEdit.name;
  const oldRoomDescription = roomToEdit.description;
  let success;

  //user interaction with popup edit form
  function handlePopupClick() {
    setEditPopup(!editPopup);
  }

  //function for to edit room if admin or creator
  async function updateRoomFetch(e) {
    e.preventDefault();

    const id = roomToEdit.id;
    if (roomToEdit) {
      try {
        const body = {
          _id: userData._id,
          isAdmin: userData.isAdmin,
          id: id,
          name: e.target.name.value,
          description: e.target.description.value,
          creator: roomToEdit.creator,
          addedUsers: roomToEdit.addedUsers
        };

        const response = await fetch(`http://localhost:3000/room/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${yourJwtToken}`
          },
        });

        const data = await response.json();
        console.log("Room updated: ", data);

        roomsList();
        handlePopupClick();
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  return (
    <div>
      <h4>Edit {oldRoomName}</h4>

      {success}

      <form className="max-w-sm mx-auto" onSubmit={updateRoomFetch}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <h6>New Room Name:</h6>
          </label>
          <input
            type="text"
            defaultValue={oldRoomName}
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description">
            <h6>New Room Description</h6>
          </label>
          <input
            type="text"
            defaultValue={oldRoomDescription}
            id="description"
            name="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update
        </button>
        <button
          type="click"
          onClick={handlePopupClick}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
