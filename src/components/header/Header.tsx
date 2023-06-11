import { useEffect,useState, useRef } from "react"
import { useSelector,useDispatch } from "react-redux";

import { RootState } from "../../app/store";
import { addTime } from "../../app/submitSlice";
import  debounce  from "../../debounce/debounce";

type PropId ={
  id:number |undefined,
  name: string |undefined,
}

interface TimeProps{
  minutes:number | null
  seconds:number | null

}


const Header = ({id ,name} : PropId) => {

  const [startTime, setStartTime] = useState<number | null>(null);
  const [time,setTime] =useState<TimeProps>({minutes : 0 ,seconds : 0});
  const latestValueRef = useRef<any>(null);

  const isSubmitted = useSelector((state: RootState) => state.submit.isSubmitted)
  const isViewMode = useSelector((state: RootState) => state.submit.isViewMode)

  const dispatch= useDispatch()
  const data = useSelector((state: RootState) => state.data.data);
  const finishedTime = useSelector((state: RootState) => state.submit.time);

  

  useEffect(() => {
    if(!isSubmitted && !isViewMode){
      const storedStartTime = sessionStorage.getItem('startTime');
      if (storedStartTime) {
        setStartTime(Number(storedStartTime));
      } else {
        const newStartTime = Date.now();
        sessionStorage.setItem('startTime', String(newStartTime));
        setStartTime(newStartTime);
      }
    }else if(isSubmitted && isViewMode){
      setTime({
        minutes: finishedTime.minutes,
        seconds: finishedTime.seconds,
      })
    }
    }, [isSubmitted]);
    
  

  useEffect(() => {
    let interval: any = null
    if(!isSubmitted ){
      interval = setInterval(() => {
        if (startTime) {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          const minutes = Math.floor(elapsedTime / 1000 / 60);
          const seconds = Math.floor((elapsedTime / 1000) % 60);
          const value = {
            minutes: minutes,
            seconds: seconds
          }
          setTime(value)
          latestValueRef.current = value
          dispatchData();
        }
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [startTime]);
   
  const dispatchData = debounce(() => {
    dispatch(addTime(latestValueRef.current));
  }, 1000);

  

 
  return (
    <div className="  top-0 lg:w-2/3 md:w-3/4 w-full h-32  flex justify-between items-center px-8 md:text-2xl text-1xl" >
        <div className="font-bold max-w-xs overflow-hidden">
            Hello <span className="text-green-400">{name}</span>
        </div>
        <div>
            <div className="font-bold">Time :  <span className="font-medium text-green-400"> {`${time.minutes} : ${time.seconds}`}</span></div>
            <div className="font-bold">Questions :  <span className="font-medium text-green-400">{id} / {data.data.length}</span></div>
        </div>
    </div>
  )
}

export default Header
