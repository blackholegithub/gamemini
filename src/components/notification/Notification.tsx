

import { submitData, addAnswerData } from "../../app/submitSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useState, useEffect } from "react";
import LoadingFrom from "../loading/LoadingForm";
import AllowFrom from "./allowFrom/AllowFrom";
import ResultForm from "./resultForm/ResultForm";

import "./Notification.css";

interface Props {
  unselectedList?: number[] | null;
  userAnswerList: number[] | [];
  showLoading?: boolean;
  handleShowNotify: (value: boolean) => void;
}

const Notification = ({
  unselectedList,
  handleShowNotify,
  userAnswerList,
  showLoading,
}: Props) => {
  const [showLoad, setShowLoad] = useState(showLoading);
  const data = useSelector((state: RootState) => state.data.data);
  const isSubmitted = useSelector(
    (state: RootState) => state.submit.isSubmitted
  )
  const isViewMode = useSelector(
    (state: RootState) => state.submit.isViewMode
  )
  const AnswerData = useSelector(
    (state: RootState) => state.submit.AnswerData
  );


  const dispatch = useDispatch();

  useEffect(() => {
    if (showLoad) {
      setTimeout(() => {
        setShowLoad(false);
      }, 3000);
    }
  }, [showLoad]);

  const handleDecline = () => {
    handleShowNotify(false);
    dispatch(submitData(false));
  };
  const handleAccept = () => {
    dispatch(submitData(true));
    sessionStorage.setItem("isSubmited", "true");
    let count = 0;
    const correctAnswer = [];
    const indexCorrect = [];
    const userAnswer = [];

    // console.log('AnswerData ',AnswerData);
    for (let i = 0; i < 10; i++) {
      correctAnswer.push(data.data[i].correct_answer);
      userAnswer.push(data.ListAnswers[i][userAnswerList[i]]);
      indexCorrect.push(
        data.ListAnswers[i].indexOf(data.data[i].correct_answer)
      );

      if (
        userAnswerList[i] ===
        data.ListAnswers[i].indexOf(data.data[i].correct_answer)
      ) {
        count += 1;
      }
    }

    // console.log("user", userAnswer);
    // console.log("user", userAnswerList);
    // console.log("indexCorrect", indexCorrect);
    // console.log("correctAnswer", count);

    dispatch(
      addAnswerData({
        userAnswer: userAnswerList,
        correctAnswer: correctAnswer,
        indexCorrect: indexCorrect,
        score: count,
      })

      
    );
  };
  // console.log('AnswerData ',AnswerData);
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      {showLoad ? (
        <LoadingFrom />
      ) : isSubmitted && !isViewMode  ? (
        <ResultForm  AnswerData ={AnswerData} handleShowNotify={handleShowNotify}/>
      ) : (
        <AllowFrom
          unselectedList={unselectedList}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
      )}
    </div>
  );
};

export default Notification;
