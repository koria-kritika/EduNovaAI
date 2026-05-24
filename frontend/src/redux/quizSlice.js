import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    userAnswers: [],
    currentQuestion: 0,
    result: null,
    loading: false,
    quizStarted: false,
    quizCompleted: false,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.userAnswers = new Array(action.payload.length).fill(null);
      state.currentQuestion = 0;
      state.quizStarted = true;
      state.quizCompleted = false;
      state.result = null;
    },
    answerQuestion: (state, action) => {
      const { index, answer } = action.payload;
      state.userAnswers[index] = answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestion < state.questions.length - 1)
        state.currentQuestion += 1;
    },
    prevQuestion: (state) => {
      if (state.currentQuestion > 0) state.currentQuestion -= 1;
    },
    setResult: (state, action) => {
      state.result = action.payload;
      state.quizCompleted = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.userAnswers = [];
      state.currentQuestion = 0;
      state.result = null;
      state.loading = false;
      state.quizStarted = false;
      state.quizCompleted = false;
    },
  },
});

export const {
  setQuestions, answerQuestion, nextQuestion,
  prevQuestion, setResult, setLoading, resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;