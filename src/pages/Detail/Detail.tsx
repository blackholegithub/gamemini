import QuestionOptions from "../../components/question/QuestionOptions";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import Notification from "../../components/notification/Notification";

import {
  fetchDataSuccess,
  fetchUser
} from "../../app/dataSlice";
import { submitData, viewMode } from "../../app/submitSlice";

export const Detail = () => {
  const [unselectedList, setUnselectedList] = useState<number[] | []>([]);
  const [userAnswerList, setUserAnswerList] = useState<number[] | []>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);


  const { name, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questionNumber = Number(id);

  const data = useSelector((state: RootState) => state.data.data);
  const isSubmitted = useSelector((state: RootState) => state.submit.isSubmitted)
  const isViewMode = useSelector((state: RootState) => state.submit.isViewMode)

  useEffect(() => {
    if (questionNumber > 10) {
      navigate(`/detail/${name}/10`);
    } else if (questionNumber <= 0) {
      navigate(`/detail/${name}/1`);
    }

    // Lấy giá trị từ sessionStorage
    if (data === null ) {
      const dataAPi = sessionStorage.getItem("dataAPi");
      const userData = sessionStorage.getItem("User");
      let userValue: any = {}
      if(userData===null){
        return
      } else{
        userValue= JSON.parse(userData)
      }
      const {userName , level} = userValue
      if (dataAPi) {
        setTimeout(() => {
          dispatch(fetchDataSuccess(JSON.parse(dataAPi)));
          dispatch(fetchUser({
            name: userName,
            level: level,
          }))
          navigate(`/detail/${name}/${id}`);
        }, 2000);
      }
    }
    if(!isSubmitted ){
      const submit = sessionStorage.getItem("isSubmited")
      if(submit){
        dispatch(submitData(true))
      }
    }
    if(!isViewMode ){
      const view = sessionStorage.getItem("isViewMode")
      if(view){
        dispatch(viewMode(true))
      }
    }

   
  }, []);

  const handleUnSelectedList = (value: number[] | []) => {
    setUnselectedList(value);
  };

  const handleUserAnswerList = (value: number[] | []) => {
    setUserAnswerList(value);
  };

  const handleShowNotify = (value: boolean) => {
    setShowNotification(value);
  };

  return (
    <div className="lg:w-2/3 md:w-3/4 w-full h-screen flex justify-center items-center flex-col text-white  ">
      {data === null || isSubmitted && !isViewMode ? (
        <Notification
          handleShowNotify={handleShowNotify}
          userAnswerList={userAnswerList.length > 0 ? userAnswerList : []}
          showLoading={true}
        />
      ) : (
        <>
          <Header id={questionNumber} name={name} />
          <QuestionOptions
            navigate={navigate}
            id={questionNumber}
            name={name}
            data={data.data[questionNumber - 1]}
            answers={data.ListAnswers[questionNumber - 1]}
            isSubmitted={isSubmitted}
            handleUnSelectedList={handleUnSelectedList}
            handleShowNotify={handleShowNotify}
            handleUserAnswerList={handleUserAnswerList}
          />
          {showNotification && !isViewMode ? (
            <Notification
              unselectedList={unselectedList.length > 0 ? unselectedList : null}
              handleShowNotify={handleShowNotify}
              userAnswerList={userAnswerList.length > 0 ? userAnswerList : []}
            />
          ) : (
            <></>
          )}
          <Footer />
        </>
      )}
    </div>
  );
};
