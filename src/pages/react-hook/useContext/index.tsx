import React, { createContext, useContext, useState } from "react";
import Text from "../../../component/Text";

interface CaseContextProps {
  value: string;
  setValue: (v: string) => void;
}

const CaseContext = createContext<CaseContextProps>(null);

function useCaseContext() {
  return useContext(CaseContext);
}

const Input = ({ value, onChange }) => {
  return <input value={value} onChange={onChange} />;
};

const P = ({ children }) => {
  return <p>{`${children} ${new Date().getTime()}`}</p>;
};

const Case = () => {
  const { value, setValue } = useCaseContext();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Input value={value} onChange={changeHandler} />
      {[1, 2, 3, 4].map((key) => (
        <Text key={key}>{value === "aaa" ? "true" : "false"}</Text>
      ))}
      <P>111</P>
    </>
  );
};

const Case2 = () => {
  return <P>case 2</P>;
};

const HowToUseUseContext = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <CaseContext.Provider value={{ value, setValue }}>
        <Case />
        <Case2 />
      </CaseContext.Provider>
    </>
  );
};

export default React.memo(HowToUseUseContext);
