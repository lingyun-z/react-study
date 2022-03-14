import { Form, FormikProvider, useField, useFormik } from "formik";
import React, { InputHTMLAttributes, useCallback } from "react";
import Button from "../../../component/Button";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = React.memo(
  function Input(props) {
    const { ...rest } = props;
    const [input] = useField(props.name);

    return (
      <div>
        <input {...rest} {...input} />
        {new Date().getTime()}
      </div>
    );
  }
);

const FormCase: React.FC = (props) => {
  // const formik = ;
  const formik = useFormik({
    initialValues: { name: "", age: "" },
    onSubmit: (v) => console.log(v),
  });

  const nameChangeHandler = useCallback(
    (e) => formik.getFieldHelpers("name").setValue(e.target.value),
    []
  );

  const ageChangeHandler = useCallback(
    (e) => formik.getFieldHelpers("age").setValue(e.target.value),
    []
  );

  return (
    <FormikProvider value={formik}>
      <Form>
        <Input
          name="name"
          // value={formik.values.name}
          // onChange={nameChangeHandler}
        />
        <Input
          name="age"
          // value={formik.values.age}
          // onChange={ageChangeHandler}
        />
        <Button type="submit">submit</Button>
      </Form>
    </FormikProvider>
  );
};

const Case: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    ></div>
  );
};

const HowToUseUseMemo: React.FC = () => {
  return (
    <>
      <FormCase />
    </>
  );
};

export default React.memo(HowToUseUseMemo);
