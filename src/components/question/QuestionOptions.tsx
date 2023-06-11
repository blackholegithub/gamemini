import  { useState } from "react";
import "./Question.css";
import { SendIcon } from "../../assets/icon";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface ChildProps {
  navigate: ReturnType<typeof useNavigate>;
}
interface Props {
  id: number;
  name: string | undefined;
  data: any;
  answers: string[] | boolean[];
  isSubmitted: boolean;
  handleUnSelectedList: (value: number[] | []) => void;
  handleUserAnswerList: (value: number[] | []) => void;
  handleShowNotify: (value: boolean) => void;
}

const QuestionOptions = ({
  navigate,
  id,
  name,
  data,
  answers,
  isSubmitted,
  handleUnSelectedList,
  handleUserAnswerList,
  handleShowNotify,
}: ChildProps & Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [right,setRight] = useState<boolean>(false);

  const isViewMode = useSelector((state: RootState) => state.submit.isViewMode);

  useEffect(() => {
    const value = sessionStorage.getItem(`question ${id} `);
    value ? setSelectedAnswer(Number(value)) : setSelectedAnswer(null);
    const correctAnswerList = sessionStorage.getItem("answerList");
    
    if (isViewMode) {
      if (correctAnswerList ) {
        const arr = JSON.parse(correctAnswerList);
        setCorrectAnswer(arr.indexCorrect[id-1])
        if(value){
          Number(value) === arr.indexCorrect[id-1] ? setRight(true):setRight(false);
        }

      }
    }
  }, [id]);

  const handleAnswerSelect = (answerIndex: number) => {
    sessionStorage.setItem(`question ${id} `, `${answerIndex}`);
    setSelectedAnswer(answerIndex);
    // console.log(answerIndex);
  }

  const handleNext = () => {
    let nextQuestion = 1;
    // Xử lý logic khi nhấn nút Next
    if (id != undefined && id <= 9 && id >= 1) {
      nextQuestion = id + 1;
    }

    navigate(`/detail/${name}/${nextQuestion}`);
  };

  const handlePrevious = () => {
    // Xử lý logic khi nhấn nút Previous
    let preQuestion = 1;

    if (id != undefined && id >= 2 && id <= 10) {
      preQuestion = id - 1;
    }

    navigate(`/detail/${name}/${preQuestion}`);
  };

  const handleSendAnswers = () => {
    const UserAnswer: number[] = [];
    const nullAnswer: number[] = [];
    for (let i = 1; i <= 10; i++) {
      let value = sessionStorage.getItem(`question ${i} `);
      if (value === null) {
        value = "-1";
        nullAnswer.push(i);
      }
      UserAnswer.push(Number(value));
    }
    handleUnSelectedList(nullAnswer);
    handleUserAnswerList(UserAnswer);
    handleShowNotify(true);
  };

  const handleGoHome = () => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }




  return (
    <div className="w-full lg:w-2/3 p-4 bg-custom-white rounded shadow">
      <div className=" mb-2">
        <div className="text-3xl font-bold my-3 text-slate-200 w-full flex justify-center ">
          Category: {data.category}
        </div>
        <h2 className={`text-xl font-bold uppercase ${isViewMode ? right? '!bg-lime-400':'!bg-red-500' : "" } `}>question : {isViewMode ? right? 'Right':'Wrong' : "" }</h2>
      </div>
      <p className="mb-8 text-xl font-semibold">{data.question}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-rows-2">
        {answers.map((answer, Index) => (
          <li
            key={Index}
            className={`flex items-center p-3 bg-gray-100 text-lg font-medium hover:bg-gray-300 transition-colors duration-200 rounded-lg ${selectedAnswer === Index ? "!bg-amber-400 !text-white" : "" } 
            ${isViewMode && right ? selectedAnswer === Index ? "!bg-lime-400 !text-white" : "" : ""}
            ${correctAnswer === Index ? "!bg-lime-400 !text-white" : "" }
            ${isViewMode && !right ? selectedAnswer === Index ? "!bg-red-500 !text-white" : "" : ""}
            `}
            onClick={() => handleAnswerSelect(Index)}
          >
            <label htmlFor={`option${Index}`} className="text-gray-700">
              {answer}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        {id === 1 ? (
          <div></div>
        ) : (
          <button
            className="px-4 py-2 text-sm font-medium my-4 w-24 text-white rounded hover:bg-red-600 transition-colors duration-200"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {id === 10 ? (
          <></>
        ) : (
          <button
            className="px-4 py-2 text-sm my-4 w-24 font-medium text-white rounded hover:bg-red-600 transition-colors duration-200"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
      {isSubmitted ? (
        <div className="w-full flex justify-center mb-2">
          <button className="GoHome" onClick={handleGoHome}>
            Go Home!
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center mb-2">
          <button className="btn_send" onClick={handleSendAnswers}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <SendIcon />
              </div>
            </div>
            <span>Send</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionOptions;
