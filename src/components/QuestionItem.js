import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
      
      
      
    })
    .then((res)=>(res.json))
    .then(()=>{
      onDelete(question)
    }
    )}

    function handleUpdate(e){
      const updatedCorrectIndex = parseInt(e.target.value, 10);

      fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({correctIndex: updatedCorrectIndex}),
      })
    .then((res)=>(res.json))
    .then((updatedQuestion)=>{
      onUpdate(updatedQuestion);

    })}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
