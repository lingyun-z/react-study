import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/reduxHook";
import { login } from "../store/AuthSlice";

const Login = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userName } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (userName) {
      router.push("/websocket/chat");
    }
  }, [userName, router]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login({ userName: value }));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          value={value}
          onChange={changeHandler}
          placeholder="Username"
          style={{
            marginRight: ".5rem",
            flexGrow: "1",
            padding: ".5rem",
          }}
        />
        <button type="submit">GO!</button>
      </form>
    </>
  );
};

export default Login;
