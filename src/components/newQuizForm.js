import React from 'react';

class NewQuizForm extends React.Component {

  state = {
    numberOfQuestions: "",
    topicsList: []
  }

  handleInputChange = event => {
    if(event.target.type === "checkbox") {
      const newList = this.state.topicsList.slice(0);

      // toggle checkbox
      event.target.checked = event.target.checked ? false : true;
      // update topicsList
      const topicIndex = this.state.topicsList.findIndex(topicId => parseInt(event.target.id) === topicId) 
      if(topicIndex === -1) { // Array.findIndex returns -1 if element is not found
        newList.push(parseInt(event.target.id));
      } else {
        newList.splice(topicIndex, 1);
      }
      this.setState({
        topicsList: newList
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  isChecked(id) {
    return this.state.topicsList.find(topic => parseInt(id) === topic) ? true : false;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createQuiz(this.state.numberOfQuestions, this.state.topicsList);
   }

  listTopics() {
    return (
      this.props.topics.map((topic, key) => {
        return (
          <div key={key}>
            <input className="checkbox form-check-input" type="checkbox" id={topic.id} name={topic.name} checked={this.isChecked(topic.id)} onChange={this.handleInputChange} />
            <label className="form-check-label">{topic.name}</label>
          </div>
        )
      })
    )
  }

  render() {
    return(
      <div className="container">
        <h1>New Quiz:</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <h3>Topics:</h3>
            {this.listTopics()}
          </div>
          <div className="form-group">
            <label >Number of Questions:</label>
            <input name="numberOfQuestions" type="text" value={this.state.numberOfTopics} onChange={this.handleInputChange} />
          </div>
          <input type="submit" className="btn btn-primary"/>
        </form>
        {console.log("#Questions: ", this.state.numberOfQuestions)}
        {console.log("Topics: ", this.state.topicsList)}
      </div>
    )
  }
}

export default NewQuizForm;