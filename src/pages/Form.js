import { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { formSlice } from "../store/formSlice";
import { adminPanelSlice } from "../store/adminPanelSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataSlice } from "../store/dataSlice";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setData } = dataSlice.actions;
  const { setFormIsVisible } = formSlice.actions;
  const { setPanelIsVisible } = adminPanelSlice.actions;

  const [signup, setSignup] = useState(true);
  const [message, setMessage] = useState(["", ""]);
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

  async function handleFormSubmit() {
    if (signup) {
      const user = {
        id: Math.ceil(Math.random() * 9999)
          .toString()
          .padStart(4, 0),
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        lastLogin: dayjs().format("ddd, DD MMM YYYY HH:mm:ss"),
        registeredAt: dayjs().format("ddd, DD MMM YYYY HH:mm:ss"),
        blocked: false,
      };
      if (
        Object.values(user)
          .map((e) => (e + "").trim())
          .includes("")
      ) {
        setMessage(["All fields are required", "red"]);
      } else {
        try {
          await axios.post("http://localhost:8800/", user);
          setSignup(false);
          setMessage(["You have been registered", "green"]);
        } catch (error) {
          setMessage([error.response.data, "red"]);
        }
      }
    } else {
      const user = {
        email: userInfo.email,
        password: userInfo.password,
        lastLogin: dayjs().format("ddd, DD MMM YYYY HH:mm:ss"),
      };
      try {
        await axios.post("http://localhost:8800/", user);
        const res = await axios.get("http://localhost:8800/");
        dispatch(setData(res.data));
        const currentUser = res.data.filter((el) => el.email === user.email)[0]
          .username;
        window.sessionStorage.setItem("currentUser", currentUser);
        setMessage(["", ""]);
        navigate("/admin-panel");
      } catch (error) {
        setMessage([error.response.data, "red"]);
      }
    }
    // dispatch(setFormIsVisible(false));
    // dispatch(setPanelIsVisible(true));
  }

  function handleSwitchButton() {
    setSignup(!signup);
  }

  return (
    <div className="mt-40 flex items-center justify-center">
      <form className="w-[40rem]" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-8">
          {message && (
            <p
              className={`text-center font-medium ${
                message[1] === "red" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message[0]}
            </p>
          )}
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
        <div className="mt-10 flex items-center justify-center gap-4">
          <p className="">{signup ? "Already" : "Don't"} have an account?</p>
          <button
            type="button"
            className="font-medium text-blue-500"
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
