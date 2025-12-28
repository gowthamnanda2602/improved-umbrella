let total_votes;
let ajay_votes;
let yash_votes;
let raina_votes;

document.addEventListener("DOMContentLoaded",() => {

  axios.get("https://crudcrud.com/api/bd705622323c4897bd1f6e9c99cacca3/voters_list")
       .then((response) => {
        
         total_votes = response.data[0].total_votes;
         ajay_votes = response.data[0].ajay_votes;
         yash_votes = response.data[0].yash_votes;
         raina_votes = response.data[0].raina_votes;
         
         countDisplay();
         for(let i=1;i<response.data.length;i++){
           display_voted_list(response.data[i]);
         }
       })
       .catch((error) => {
         console.log("error in loading voters list :",error);
       })
      });

       function countDisplay() {
         const p = document.getElementById("total_count");
         p.textContent = `total votes : ${total_votes}`;
         const div = document.getElementById("ajay");
         div.children[1].textContent = `total votes : ${ajay_votes}`;
         const yash_count = document.getElementById("yash");
         yash_count.children[1].textContent = `total votes : ${yash_votes}`;
         const raina_count = document.getElementById("raina");
         raina_count.children[1].textContent = `total votes : ${raina_votes}`;
       }

       function display_voted_list(data){
         const div = document.querySelector(`#${data.votedTo}`);
         const li = document.createElement("li");
         li.textContent = data.voter_name;
         const deletebtn = document.createElement("button");
         deletebtn.textContent = "delete";
         // use an arrow function to pass arguments; otherwise deleteVoter() is invoked immediately
         deletebtn.addEventListener("click", () => deleteVoter(data, li));
         li.appendChild(deletebtn);
         div.children[2].appendChild(li);
       }

       function deleteVoter(data,li){
         total_votes = total_votes-1;
         const p = document.querySelector("#total_count");
         p.textContent = `total votes : ${total_votes}`;
         li.remove();
         if(data.votedTo === "ajay"){
           ajay_votes = ajay_votes-1;
           delete_voter(ajay_votes);
         }
         else if(data.votedTo === "yash"){
           yash_votes = yash_votes-1;
           delete_voter(yash_votes);
         }
         else{
           raina_votes = raina_votes-1;
           delete_voter(raina_votes);
         }
         
         function delete_voter(voteCount){
           const div = document.querySelector(`#${data.votedTo}`);
           div.children[1].textContent = `total votes : ${voteCount}`;
         }
         const votesCount = {
           total_votes,
            ajay_votes,
            yash_votes,
           raina_votes
         }
         axios.put("https://crudcrud.com/api/bd705622323c4897bd1f6e9c99cacca3/voters_list/691836f5d8450603e8be96b5",votesCount)
         .then((response) => {
           console.log(response)
         })
         .catch((error) => {
           console.log("error updating votes count after deleting a voter :",error);
         })

         axios.delete(`https://crudcrud.com/api/bd705622323c4897bd1f6e9c99cacca3/voters_list/${data._id}`)
         .then((response) => {
           console.log("voter deleted successfully");
         })
         .catch((error) => {
           console.log("error deleting voter :",error);
         });  
       }

       const form = document.querySelector("form");
    form.addEventListener("submit",(event) => {
      event.preventDefault();
      const voter_name = String(event.target.voter_name.value);
      const votedTo = String(event.target.candidate.value);
      const voterDetails = {
        voter_name,
        votedTo
      }
      event.target.reset();
      
      axios.post("https://crudcrud.com/api/bd705622323c4897bd1f6e9c99cacca3/voters_list",voterDetails)
           .then((response) => {
            console.log(response);
            display_voted_list(response.data);
      total_votes = total_votes+1;
      const p = document.querySelector("#total_count");
      p.textContent = `total votes : ${total_votes}`;
      if(votedTo === "ajay"){
        ajay_votes = ajay_votes+1;
        displayVoteCount(ajay_votes);
      }
     else if(votedTo === "yash"){
        yash_votes = yash_votes+1;
        displayVoteCount(yash_votes);
      }
      else{
        raina_votes = raina_votes+1;
        displayVoteCount(raina_votes);
      }
      
      function displayVoteCount(votecount){
        const div = document.querySelector(`#${votedTo}`);
        div.children[1].textContent = `total votes : ${votecount}`;
      }
           })
           .catch((error) => {
             console.log("error post request of form submission :",error);
           })
      
      const votecount = {
        total_votes,
        ajay_votes,
        yash_votes,
        raina_votes
      }      
      console.log(votecount,votedTo);
      axios.put("https://crudcrud.com/api/bd705622323c4897bd1f6e9c99cacca3/voters_list/691836f5d8450603e8be96b5",votecount)
           .then((response) => {
             console.log("updating votes count successful after form submission :",response);
           })
           .catch((error) => {
             console.log("error in updating votes count after form submission :",error);
           })
      })




