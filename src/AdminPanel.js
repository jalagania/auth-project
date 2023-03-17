import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import removeIcon from "./assets/trash.svg";
import unblockIcon from "./assets/unlock-alt.svg";
import { adminPanelSlice } from "./store/adminPanelSlice";
import { dataSlice } from "./store/dataSlice";
import { formSlice } from "./store/formSlice";

function AdminPanel() {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.data);
  const { selectUser, selectAll, blockUser, unblockUser, deleteUser } =
    dataSlice.actions;
  const { setFormIsVisible } = formSlice.actions;
  const { setPanelIsVisible } = adminPanelSlice.actions;

  const [allSelected, setAllSelected] = useState(false);

  function handleBlockUser() {
    dispatch(blockUser());
    dispatch(selectAll(false));
  }

  function handleUnblockUser() {
    dispatch(unblockUser());
    dispatch(selectAll(false));
  }

  function handleDeleteUser() {
    dispatch(deleteUser());
    dispatch(selectAll(false));
  }

  function handleLogout() {
    dispatch(setPanelIsVisible(false));
    dispatch(setFormIsVisible(true));
    dispatch(selectAll(false));
  }

  function handleSelectAll(event) {
    dispatch(selectAll(event.target.checked));
    setAllSelected(!allSelected);
  }

  function handleSelectUser(id) {
    dispatch(selectUser(id));
  }

  useEffect(() => {
    data.map((user) => user.selected).includes(false)
      ? setAllSelected(false)
      : setAllSelected(true);
    if (data.length === 0) {
      setAllSelected(false);
    }
  }, [data]);

  return (
    <div>
      <header className="flex items-center gap-20 bg-[#f0f8ff] py-8 px-8">
        <button
          className="btn rounded-lg bg-red-600 text-white"
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
          className="btn ml-auto rounded-lg bg-blue-600 text-white"
          onClick={handleLogout}
        >
          Log out
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
                      checked={user.selected}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
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
