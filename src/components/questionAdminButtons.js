import React from 'react';
import { Link } from 'react-router-dom';

function QuestionAdminButtons(props) {
  if(props.userIsAdmin) {
    return (
      <>
        <Link to={`/questions/${props.questionId}/edit`}>
          <button className="btn btn-primary">
            Edit Question
          </button>
        </Link>
        <button className="btn btn-primary pull-right mr-1" onClick={props.deleteQuestion} >
          Delete Question
        </button>
      </>
    );
  } else {
    return (<></>);
  }
}

export default QuestionAdminButtons;