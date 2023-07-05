import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "../../components/Questions/types";
import { IQuestionsInitial } from "../types";

const initialState: IQuestionsInitial = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAllQuestions: (state, { payload }: PayloadAction<IQuestion>) => {
      state.questions = [
        ...state.questions.filter((item) => item.id !== payload.id),
        { ...payload },
      ];
    },

    unsetAllQuestions: (state) => {
      state.questions = [];
    },
  },
});
export const { setAllQuestions, unsetAllQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
