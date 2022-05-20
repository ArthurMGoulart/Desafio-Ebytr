import PropTypes from 'prop-types';
import React from 'react';

function TaskCard(props) {
  const { sale, index } = props;
  const { description, status } = sale;
  return (
    <div className="saleCard" key={ index }>
      <div>
        <h1>Task</h1>
        <h2>{index}</h2>
      </div>
      <div>
        <h1>{description}</h1>
      </div>
      <div>
        <h1>{status}</h1>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  sale: PropTypes.shape({
    description: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskCard;
