import { useState } from "react";
import React, {useEffect} from "react";

import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";


function QuestionList() {
  const [quizzes, setQuizzes]=useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => setQuizzes(data))
    .catch((err) => console.log(err));
  }, []);
  
  function handleAddQuestion(newQuiz){
    setQuizzes([...quizzes, newQuiz]);
  }

  function handleDelete(deleted){
    const updatedItems = quizzes.filter((quiz) => quiz.id !== deleted.id);
    setQuizzes(updatedItems);
    }
    function handleUpdate(updatedQuestion) {
      // Update the state with the new question data
      setQuizzes((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        )
      );
    }
    
  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm onAddItem={handleAddQuestion}/>
      <ul>{(quizzes.map((quiz)=>{
        return <QuestionItem onUpdate={handleUpdate} onDelete={handleDelete} key={quiz.id} question={quiz} />   


      }))}</ul>
      
    </section>
  );
}

export default QuestionList;
