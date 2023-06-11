
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import congratulations from "../../../assets/congratulationIcon.svg";
import fallIcon from "../../../assets/fallIcon.svg";
import { viewMode } from "../../../app/submitSlice";
import { RootState } from "../../../app/store";


interface Props {
  AnswerData: any;
  handleShowNotify: (value: boolean) => void;
}

import "./ResultForm.css";

const ResultForm = ({ AnswerData , handleShowNotify}: Props) => {
  const [score, setScore] = useState(0);
  const user = useSelector((state: RootState) => state.data.user);
  const time = useSelector((state: RootState) => state.submit.time);
  const answerList = useSelector((state: RootState) => state.submit.AnswerData);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const CurrentScore = AnswerData.score;
    setScore(CurrentScore);

  }, []);

  const handleShowAnswer =()=>{

const answerJson = JSON.stringify(answerList)

    dispatch(viewMode(true))
    sessionStorage.setItem("isViewMode", "true");
    sessionStorage.setItem("answerList", answerJson);
    const val = JSON.stringify(time)
    sessionStorage.setItem("timeID", val);
    handleShowNotify(false)
    navigate(`/detail/${user.name}/1`);
  }


  const handleGoHome = () => {
    sessionStorage.clear();
    setTimeout(()=>{
        navigate('/')
    },1000)
    
  }

  return (
    <div className="notificationCard">
      <p className="notificationHeading">
        {score >= 5 ? "Congratulations!!" : "Completed!"}
      </p>
      <img
        className="icon"
        src={score >= 5 ? congratulations : fallIcon}
        alt=""
      />
      <p className="notificationPara">
        {score >= 5 ? "You are amazing!!" : "Better luck next time !"}
      </p>
      <p className="notificationPara overflow-hidden max-w-md">Name: {user.name} <span className="ml-8"> level: {user.level} </span></p>
      <p className="notificationPara ">Number of correct answers: {score}/10</p>
      <p className="notificationPara">Time: {time.minutes ? time.minutes : 0 } minutes , {time.seconds ? time.seconds : 0 } seconds </p>
      <div className="buttonContainerResult">
        <button className="ShowAnswerBtn" onClick={handleShowAnswer}>Show Answer</button>
        <button className="HomeBtn" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ResultForm;
