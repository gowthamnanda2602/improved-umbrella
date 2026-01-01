import React,{useState, useEffect} from "react";
import "./Form.css";

const Form = (props) => {

  const [user, setUser] = useState("");
  const [rating, setRating] = useState("1");

  useEffect(() => {
    if(props.editCandidate){
      setUser(props.editCandidate.name);
      setRating(props.editCandidate.rating);
    }
  }, [props.editCandidate]);

  const userNameHandler = (event) => {
    setUser(event.target.value);
  };
  const ratingHandler = (event) => {
    setRating(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    
    if(props.formButton === "submit")
   { const userObject = {
      id: Math.random().toString(),
      name: user,
      rating: +rating
    }
    props.ratingApp(+rating,userObject);
    setUser("");
    setRating("1");
  }

  else{  
    const userObject = {
      id: props.editCandidate.id,
      name: user,
      rating: +rating
    }
    props.reSubmitForm(+rating,userObject);
    setUser("");
    setRating("1");
  }
  }

  return(
        <form className="form" onSubmit={formSubmitHandler}>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={user} onChange={userNameHandler} />
          <label htmlFor="rating">Rating: </label> 
            <select id="rating" value={rating} onChange={ratingHandler}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
           <button type="submit" onSubmit={formSubmitHandler} >{props.formButton === "submit" ? "Submit" : "Resubmit"}</button> 
        </form>
    )
}

export default Form;