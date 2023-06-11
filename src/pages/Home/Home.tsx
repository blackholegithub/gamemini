import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../app/store";

import Footer from "../../components/footer/Footer";
import LoadingFrom from "../../components/loading/LoadingForm";
import "./home.css";
import { useState, useEffect } from "react";
import { startApi } from "../../Api/questionApi";
import {
  startLoading,
  fetchDataSuccess,
  fetchDataFailure,
  fetchUser,
} from "../../app/dataSlice";
import { submitData, addAnswerData, viewMode,addTime } from "../../app/submitSlice";

export const Home = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const loading = useSelector((state: RootState) => state.data.loading);
  const isSubmitted = useSelector(
    (state: RootState) => state.submit.isSubmitted
  )

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      sessionStorage.clear();
      dispatch(submitData(false))
      dispatch(viewMode(false))
      dispatch(addTime({
        minutes:0,
        seconds:0
      }))
      dispatch(addAnswerData({
        userAnswer: [],
        correctAnswer: [],
        indexCorrect: [],
        score: 0,
      }))
      dispatch(fetchDataSuccess(null))
      dispatch(fetchUser({
        name: null,
        level: null,
      }))
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value.length > 26 ? setName(name) : setName(value.trimStart());
  };

  const handleOptionChange = (value: string) => {
    setLevel(value);
  };

  const handleEnterStart = async () => {
    if (name.length > 0 && level != "") {
      const trimmedStr = name.replace(/[\s!.,]/g, "");
      sessionStorage.clear();
      dispatch(startLoading());
      try {
        const response = await startApi(10, level);

        const answerList = response.results.map((item: any) => {
          const { correct_answer, incorrect_answers } = item;
          const Answers = [...incorrect_answers, correct_answer];
          const random = Answers.sort(() => Math.random() - 0.5);
          return random;
        });

        const data = {
          data: response.results,
          ListAnswers: answerList,
        };

        // console.log(data);

        dispatch(fetchDataSuccess(data));
        dispatch(fetchUser({
          name: name,
          level: level,
        }))
        const jsonData = JSON.stringify(data);
        const jsonUserData = JSON.stringify({userName: name, level: level});
        sessionStorage.setItem("dataAPi", jsonData);
        sessionStorage.setItem("User", jsonUserData);
        // console.log("API response:", response.results);
        navigate(`/detail/${trimmedStr}/${1}`);
      } catch (error: any) {
        dispatch(fetchDataFailure(error.message));
        console.error("API error:", error);
      }
    } else {
      alert("you need enter your name and question level ");
    }
  };

  return (
    <div className="xl:w-2/3 lg:w-4/5 w-full h-screen flex justify-center items-center flex-col text-white   ">
      {loading ? (
        <LoadingFrom />
      ) : (
        <>
          <div className="w-full h-full  flex justify-center items-center flex-col">
            <div className="header_text xl:text-9xl sm:text-7xl mb-4">
              WELCOME !
            </div>
            {/* <Img
          url={
            "https://static.vecteezy.com/system/resources/previews/008/441/791/original/smile-emotion-icon-illustration-design-free-vector.jpg"
          }
        /> */}
            <div className="w-full flex justify-center">
              <div className="input__container xl:w-96 sm:w-96 ">
                <input
                  placeholder="Enter your name"
                  className="value_input text-center uppercase sm:text-2xl"
                  name="text"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="my-4 bg-custom-white  rounded-3xl">
              <div className="radio-inputs sm:w-80">
                <label className="radio">
                  <input
                    type="radio"
                    name="radio"
                    onChange={() => handleOptionChange("easy")}
                    checked={level === "easy" ? true : false}
                  />
                  <span className="name">easy</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="radio"
                    checked={level === "medium" ? true : false}
                    onChange={() => handleOptionChange("medium")}
                  />
                  <span className="name">medium</span>
                </label>

                <label className="radio">
                  <input
                    type="radio"
                    name="radio"
                    checked={level === "hard" ? true : false}
                    onChange={() => handleOptionChange("hard")}
                  />
                  <span className="name">hard</span>
                </label>
              </div>
            </div>
            <div className="my-4 bg-custom-white p-0 rounded-3xl">
              <button className="btn" type="button" onClick={handleEnterStart}>
                <strong className="uppercase">start</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </button>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
