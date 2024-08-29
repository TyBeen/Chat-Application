import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Welcome from "./Welcome.jsx";
import RoomEditPopup from "../modals/RoomEditPopup.jsx";
import Chatroom from "./Chatroom.jsx";

export default function Dashboard({ clearUser, userData, setLinksHidden }) {
  const yourJwtToken = localStorage.getItem("jwtToken");
  setLinksHidden(false);

  //useStates
  const [rooms, setRooms] = useState([]); //track all rooms state
  const [editPopup, setEditPopup] = useState(false); //hide or show edit popup for room by id (button id is {room.id})
  const [roomToEdit, setRoomToEdit] = useState({}); //sends room object to edit room modal for fetch and update
  const [currentRoom, setCurrentRoom] = useState({}); //sets current room from user click

  //useEffects
  useEffect(() => {
    roomsList();
  }, []);

  //FUNCTIONS
  //get all rooms function for sidebar nav
  async function roomsList() {
    const response = await fetch(`http://localhost:3000/room/`);

    const data = await response.json();
    setRooms(data); //set state variable rooms with all rooms in db
  }

  //function to onClick change currentRoom, etc, and refetch messages
  function handleSelectedRoom(room) {
    console.log("room: ", room);

    let body = {
      _id: room._id,
      name: room.name,
      description: room.description,
      creator: room.creator,
      addedUsers: room.addedUsers,
    };

    //updating state variable with current room data for message functionality
    setCurrentRoom((prevRoom) => {
      const updatedCurrentRoom = { ...body, ...prevRoom };

      return updatedCurrentRoom;
    });
  }

  //post add new room function for form submit button
  async function newRoomHandler(event) {
    event.preventDefault();

    try {
      const name = event.target.name.value;
      const description = event.target.description.value;
      const creator = userData._id;

      const body = {
        name: name,
        description: description,
        creator: creator,
        addedUsers: [],
      };

      const response = await fetch("http://localhost:3000/room/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${yourJwtToken}`,
        },
      });

      const data = await response.json();
      console.log("New Room: ", data);

      event.target.reset();
      roomsList(); //function to fetch new list of all rooms
    } catch (err) {
      throw new Error();
    }
  }

  async function showEditPopup(event, room) {
    event.preventDefault();

    setEditPopup(!editPopup);

    const roomBody = {
      id: room._id,
      name: room.name,
      description: room.description,
      creator: room.creator,
      addedUsers: room.addedUsers,
    };

    setRoomToEdit(roomBody);
  }

  //function for button on each room to delete room if admin or creator
  async function onClickDelete(room) {
    try {
      const _id = userData._id;
      const isAdmin = userData.isAdmin;
      const id = room._id;
      const creator = room.creator;

      const body = {
        _id: _id,
        isAdmin: isAdmin,
        id: id,
        creator: creator,
      };

      const response = await fetch(`http://localhost:3000/room/${id}`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${yourJwtToken}`,
        },
      });

      const data = await response.json();
      console.log("Room Deleted: ", data);

      roomsList();
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <>
      <Welcome
        clearUser={clearUser}
        userData={userData}
        setLinksHidden={setLinksHidden}
      />

      {editPopup && (
        <RoomEditPopup
          roomToEdit={roomToEdit}
          userData={userData}
          roomsList={roomsList}
          editPopup={editPopup}
          setEditPopup={setEditPopup}
        />
      )}

      <aside
        id="default-sidebar"
        className="inline-flex top-0 left-0 bottom-20 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h3 className="uppercase text-center text-5xl font-bold tracking-widest text-gray-500 dark:text-gray-400">
            Rooms
          </h3>
          <nav>
            <ul className="space-y-2 font-medium">
              {rooms?.map((room) => (
                <li className="ms-3" key={room._id}>
                  <Link
                    className="flex items-center p-2 text-4xl text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    onClick={() => {
                      handleSelectedRoom(room);
                    }}
                  >
                    {room.name}
                  </Link>
                  <h6>{room.description}</h6>
                  <button
                    type="click"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    id={room._id}
                    onClick={() => {
                      onClickDelete(room);
                    }}
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Delete
                    </span>
                  </button>
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                    id={room._id}
                    onClick={(event) => {
                      showEditPopup(event, room);
                    }}
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Edit
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <span className="form">
              <form className="max-w-sm mx-auto" onSubmit={newRoomHandler}>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Add New Room
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    id="description"
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Add Room
                  </button>
                </div>
              </form>
            </span>
          </nav>
        </div>
      </aside>

      {currentRoom && (
        <Chatroom userData={userData} currentRoom={currentRoom} />
      )}

      <Outlet />

      
      <p className="absolute bottom-0 right-0 h-16 w-16">
        Website CSS by <a href="https://flowbite.com/" className="text-blue-600"> Flowbite</a>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z" />
        </svg>
      </p>
      
    </>
  );
}
