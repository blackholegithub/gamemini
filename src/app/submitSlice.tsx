import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Answers {
     userAnswer: number[] | [];
     correctAnswer: number[];
     indexCorrect: number[]
     score : number
}

interface TimeProps{
  minutes:number | null
  seconds:number | null
}

interface SubmitState {
  isSubmitted: boolean;
  isViewMode: boolean
  AnswerData: Answers;
  time:TimeProps
}

const initialState: SubmitState = {
  isSubmitted: false,
  isViewMode: false,
  AnswerData: {
    userAnswer: [],
    correctAnswer:[],
    indexCorrect:[],
    score: 0,
  },
  time:{
    minutes:0,
    seconds:0,
  }

};

const submitSlice = createSlice({
  name: 'submit',
  initialState,
  reducers: {
    submitData: (state,action:PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    addAnswerData: (state, action: PayloadAction<Answers>) => {
      state.AnswerData = action.payload;
    },
    viewMode: (state,action:PayloadAction<boolean>) => {
      state.isViewMode = action.payload;
    },
    addTime: (state, action: PayloadAction<TimeProps>) => {
      state.time = action.payload;
    },
  },
});

export const { submitData, addAnswerData,viewMode ,addTime} = submitSlice.actions;

export default submitSlice.reducer;
