import {
  Form,
  FormikProvider,
  useField,
  useFormik,
  useFormikContext,
} from "formik";
import React from "react";

const OptionField = (props) => {
  const { questionIndex, optionIndex: index, name, option } = props;
  const { content, correct } = option;
  const { values, setValues, handleChange, registerField } =
    useFormikContext<any>();
  const removeOption = () => {
    values.questions[questionIndex].options.splice(index, 1);
    setValues({ ...values });
  };

  return (
    <div>
      <p>Option {index + 1}</p>
      <input name={`${name}.content`} value={content} onChange={handleChange} />
      <input
        type="checkbox"
        name={`${name}.correct`}
        value={correct}
        onChange={handleChange}
      />
      <button type="button" onClick={removeOption}>
        remove Option
      </button>
    </div>
  );
};

const SingleChoiceField = (props) => {
  const {
    index,
    question: { content, options },
    name,
  } = props;

  const { values, setValues, handleChange } = useFormikContext<any>();
  const [_, meta] = useField({
    name,
    validate: (values) => {
      return "";
    },
  });

  const addOption = () => {
    values.questions[index].options.push({
      content: "",
      correct: true,
    });
    setValues({
      ...values,
    });
  };

  const removeQuestion = () => {
    values.questions.splice(index, 1);
    setValues({ ...values });
  };

  return (
    <div>
      <p>Question {index + 1}</p>
      <input name={`${name}.content`} value={content} onChange={handleChange} />
      <button type="button" onClick={removeQuestion}>
        remove Question
      </button>
      {options.map((option, i) => (
        <OptionField
          key={i}
          questionIndex={index}
          optionIndex={i}
          name={`${name}.options.${i}`}
          option={option}
        />
      ))}
      {meta.error && <p>{meta.error}</p>}
      <button type="button" onClick={addOption}>
        add Option
      </button>
    </div>
  );
};

enum QuestionEnum {
  SINGLE_CHOICE = "SINGLE_CHOICE",
}

interface SingleChoiceOption {
  content: string;
  correct: boolean;
}

interface SingleChoice {
  type: QuestionEnum.SINGLE_CHOICE;
  content: string;
  options: SingleChoiceOption[];
}

type Question = SingleChoice;

interface ResponseBody {
  content: string;
  questions: Question[];
}

const Case = () => {
  const formik = useFormik<ResponseBody>({
    initialValues: {
      content: "",
      questions: [
        {
          type: QuestionEnum.SINGLE_CHOICE,
          content: "world",
          options: [{ content: "hello", correct: true }],
        },
      ],
    },
    onSubmit: (v) => {
      console.log(v);
    },
  });
  const { values, setValues } = formik;

  const addQuestion = () => {
    setValues({
      ...values,
      questions: [
        ...values.questions,
        {
          type: QuestionEnum.SINGLE_CHOICE,
          content: "new question",
          options: [{ content: "", correct: true }],
        },
      ],
    });
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        {/* <FieldArray name="questions">
            {() =>
              values.questions.map((question, i) => (
                <SingleChoiceField
                  key={i}
                  index={i}
                  question={question}
                  name={`questions.${i}`}
                />
              ))
            }
          </FieldArray> */}
        {values.questions.map((question, i) => (
          <SingleChoiceField
            key={i}
            index={i}
            question={question}
            name={`questions.${i}`}
          />
        ))}
        <button type="button" onClick={addQuestion}>
          add Question
        </button>
        <button type="submit">submit</button>
      </Form>
    </FormikProvider>
  );
};

export default React.memo(Case);
