function deleteTopic(topicId) {
  return dispatch => {
    dispatch({ type: 'DELETING_TOPIC' });
    const configurationObject = {
        method: "DELETE",
        mode: "cors",
        headers: { 
          "Accept": "application/json",
           authorization: sessionStorage.getItem("jwtToken")
        }
      }
      fetch(`/topics/${topicId}`, configurationObject)
        .then(response => response.json())
        .then(json => {       
          if(json.status === "success") {
            console.log("topic deleted");
            document.location.href="/topics";
          }
        });
  }
}

export default deleteTopic;