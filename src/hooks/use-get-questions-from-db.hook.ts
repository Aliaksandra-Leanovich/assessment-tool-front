import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IQuestion } from "../components/Questions/types";
import { Collections } from "../enums";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserInfo } from "../store/selectors";
import { getQuestions } from "../store/selectors/questionsSelector";
import { setAllQuestions } from "../store/slices/questionSlice";
import { db } from "../utils/firebase";

export const useGetQuestionsFromDB = () => {
  const dispatch = useAppDispatch();
  const [questionsFromDB, setQuestions] = useState<Array<IQuestion>>();
  const { questions } = useAppSelector(getQuestions);
  const { uidLevel } = useAppSelector(getUserInfo);

  useEffect(() => {
    if (uidLevel) {
      onSnapshot(
        collection(db, Collections.test, uidLevel, Collections.questions),
        (querySnapshot) => {
          const questions: any = [];
          querySnapshot.forEach((doc) => {
            questions.push(doc.data());
          });
          setQuestions(questions);
        }
      );
    }
  }, [uidLevel]);

  useEffect(() => {
    questionsFromDB?.map((question) => {
      return dispatch(setAllQuestions(question));
    });
  }, [dispatch, questionsFromDB]);

  return {
    questions,
  };
};
