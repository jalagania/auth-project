import { useState } from "react";
import removeIcon from "./assets/trash.svg";
import unblockIcon from "./assets/unlock-alt.svg";
import { data } from "./data";

function AdminPanel() {
  const [allSelected, setAllSelected] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  function handleBlockUser() {
    console.log("block user!");
  }

  function handleDeleteUser() {
    console.log("Delete user!");
  }

  function handleUnblockUser() {
    console.log("Unblock user!");
  }

  function handleLogout() {
    console.log("Logout!");
  }

  function handleSelectAll(event) {
    event.target.checked ? setUserSelected(true) : setUserSelected(false);
    setAllSelected(event.target.checked);
  }

  function handleSelectUser(event) {
    if (!event.target.checked) {
      setAllSelected(false);
    }
    setUserSelected(event.target.checked);
  }

  return (
    <div>
      <header className="flex gap-20 py-8 bg-[#f0f8ff] items-center px-8">
        <button
          className="btn bg-red-600 rounded-lg text-white"
          onClick={handleBlockUser}
        >
          Block
        </button>
        <button onClick={handleUnblockUser}>
          <img src={unblockIcon} alt="unblock" />
        </button>
        <button onClick={handleDeleteUser}>
          <img src={removeIcon} alt="trash" />
        </button>
        <button
          className="btn text-white bg-blue-700 ml-auto rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <main className="mt-12 px-8">
        <table className="my-0 mx-auto w-full">
          <thead className="text-left">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Registered</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={userSelected}
                      onChange={handleSelectUser}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.lastLogin}</td>
                  <td>{user.registered}</td>
                  <td>{user.blocked ? "blocked" : "active"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminPanel;
