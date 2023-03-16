import { useState } from "react";
import { useSelector } from "react-redux";
import removeIcon from "./assets/trash.svg";
import unblockIcon from "./assets/unlock-alt.svg";

function AdminPanel() {
  const { data } = useSelector((store) => store.data);
  const [allSelected, setAllSelected] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(
    data.map((item) => false)
  );

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
    event.target.checked
      ? setCheckboxStates(data.map((item) => true))
      : setCheckboxStates(data.map((item) => false));
    setAllSelected(!allSelected);
  }

  function handleSelectUser(index) {
    const checkboxArr = checkboxStates.map((check, i) => {
      return index === i ? !check : check;
    });
    checkboxArr.includes(false) ? setAllSelected(false) : setAllSelected(true);
    setCheckboxStates(checkboxArr);
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
            {data.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkboxStates[index]}
                      onChange={() => handleSelectUser(index)}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
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
