import { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { formSlice } from "./store/formSlice";
import { adminPanelSlice } from "./store/adminPanelSlice";

function Form() {
  const dispatch = useDispatch();
  const { setFormIsVisible } = formSlice.actions;
  const { setPanelIsVisible } = adminPanelSlice.actions;

  const [signup, setSignup] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleFormSubmit() {
    if (signup) {
      const user = {
        selected: false,
        id: Math.ceil(Math.random() * 9999)
          .toString()
          .padStart(4, 0),
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        lastLogin: dayjs().format("ddd, DD MMM YYYY HH:mm:ss"),
        registered: dayjs().format("ddd, DD MMM YYYY HH:mm:ss"),
        blocked: false,
      };
      console.log(user);
    } else {
      const user = {
        email: userInfo.email,
        password: userInfo.password,
      };
      console.log(user);
    }
    dispatch(setFormIsVisible(false));
    dispatch(setPanelIsVisible(true));
  }

  function handleSwitchButton() {
    setSignup(!signup);
  }

  return (
    <div className="mt-40 flex items-center justify-center">
      <form
        action=""
        className="w-[40rem]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-8">
          {signup && (
            <input
              type="text"
              name="username"
              value={userInfo.username}
              placeholder="Username"
              className="rounded-lg border border-solid border-zinc-500 p-4"
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            name="email"
            value={userInfo.email}
            placeholder="Email address"
            className="rounded-lg border border-solid border-zinc-500 p-4"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={userInfo.password}
            placeholder="Password"
            className="rounded-lg border border-solid border-zinc-500 p-4"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn mt-6 rounded-lg bg-blue-500 text-white"
            onClick={handleFormSubmit}
          >
            {signup ? "Register" : "Log in"}
          </button>
        </div>
        <div className="mt-10 flex items-center justify-evenly">
          <p className="">{signup ? "Already" : "Don't"} have an account?</p>
          <button
            type="button"
            className="btn rounded-lg border-2 border-solid  border-blue-500 text-blue-500"
            onClick={handleSwitchButton}
          >
            {signup ? "Log in" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
