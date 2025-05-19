// src/components/DarkButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './CreateButt.css';

export default function DarkButton({ onClick, disabled = false }) {
  return (
    <button
      className="dark-button"
      onClick={onClick}
      disabled={disabled}
    >
      Create a new Task
    </button>
  );
}

DarkButton.propTypes = {
  onClick:  PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};
