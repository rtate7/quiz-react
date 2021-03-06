import React from 'react';
import NewQuizForm from '../components/newQuizForm';
import { connect } from 'react-redux';
import { getTopics } from '../actions/topicActions';
import { URL } from '../appData/applicationConstants';
import { createQuiz, storeQuizResults, storeQuestionResponse, resetQuiz } from '../actions/quizActions';
import PlayableQuiz from '../components/playableQuiz';
import LoadingMessage from '../components/loadingMessage';


class QuizContainer extends React.Component {
  componentDidMount() {
    this.props.getTopics(this.props.user.token);
  }

  renderWhenLoaded() {
    if(this.props.quiz.inProgress) {
      return (<LoadingMessage />)
    }
    else if(this.props.quiz.questions.length > 0) {
      return (
        <div>
          <PlayableQuiz 
            user={this.props.user} 
            quiz={this.props.quiz} 
            storeQuizResults={this.props.storeQuizResults}
            storeQuestionResponse={this.props.storeQuestionResponse}
            resetQuiz={this.resetQuiz}
          />
        </div>
      )
    } else if(this.props.loadingTopics) {
      return(<LoadingMessage />);
    } else if(this.props.topics.length > 0) {
      return(
        <div>
          <NewQuizForm 
            createQuiz={this.props.createQuiz} 
            token={this.props.user.token} 
            topics={this.props.topics} 
          />
        </div>
      )
    }
  }

  resetQuiz = event => {
    event.preventDefault();
    this.props.resetQuiz();
  }

  render() {
    return (
      <div>
        {this.renderWhenLoaded()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    getTopics: (token) => dispatch(getTopics(URL, token)),
    createQuiz: (numberOfQuestions, topics, token) => dispatch(createQuiz(URL, numberOfQuestions, topics, token)),
    storeQuizResults: (questions, token) => dispatch(storeQuizResults(URL, questions, token)),
    storeQuestionResponse: (question, choice) => dispatch(storeQuestionResponse(question, choice)),
    resetQuiz: () => dispatch(resetQuiz())
  });
}

const mapStateToProps = state => {
  return ({
    topics: state.topics.topicList,
    quiz: state.quiz,
    user: state.user,
    loadingTopics: state.topics.inProgress
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);