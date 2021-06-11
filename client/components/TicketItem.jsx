import React from 'react';
import PropTypes from "prop-types";

export const TicketItem = ({name, date}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{date}</td>
    </tr>
  )
};

TicketItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string
};