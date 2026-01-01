import React,{useState} from "react";
import OveralRating from "./OveralRating";
import Form from "./Form";
import Candidates from "./Candidates";
import "./App.css";

function App() {

  const [count, setCount] = useState([0,0,0,0,0]);
  const [candidates,setCandidates]=useState([]);
  const [formButton,setFormButton]=useState("submit");
  const [editCandidate,setEditCandidate]=useState(null);

  const formApp = (rating,candidate) => {
    setCount((prevState) => {
      const newState = [...prevState];
      newState[rating - 1] = newState[rating - 1] + 1;
      return newState;
    })
    setCandidates((prevState)=>{
      return[...prevState,candidate];
    });   
  }

  const deleteCandidate = (candidatesProps) => {
    setCandidates((prevState) => {
      return prevState.filter(candidate => candidate.id !== candidatesProps.id);
    });
    setCount((prevState) => {
      const newState = [...prevState];
      newState[candidatesProps.rating - 1] = newState[candidatesProps.rating - 1] - 1;
      return newState;
    })
  };

  const editClick = (candidatesProps) => {
    setFormButton("Resubmit");
    setEditCandidate(candidatesProps);
  }

  const reSubmitForm = (rating,candidate) => {
    setCount((prevState) => {
      const newState = [...prevState];
      newState[candidate.rating - 1] = newState[candidate.rating - 1] + 1;
      newState[editCandidate.rating - 1] = newState[editCandidate.rating - 1] - 1;
      return newState;
    })
    setCandidates((prevState)=>{
      return prevState.map((cand)=>{
        if(cand.id === candidate.id){
          return candidate;
        }
        return cand;
      })
    });
    setFormButton("submit");
    setEditCandidate(null);
  }

  return (
    <div className="app">     
      <OveralRating count={count} />
      <Form ratingApp={formApp} formButton={formButton} editCandidate={editCandidate} reSubmitForm={reSubmitForm} />
      <ul>
        {
        candidates.map((candidate)=>{
            return(
              <Candidates 
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              rating={candidate.rating}
              onDelete={deleteCandidate}
              onEdit={editClick}
              />
            )
        })
        }
      </ul>
    </div>
  );
}

export default App;
