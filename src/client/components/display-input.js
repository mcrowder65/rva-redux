import React from "react";
import PropTypes from "prop-types";

import { connect } from "../my-redux";

const DisplayInput = props => {
  return props.input;
};

DisplayInput.propTypes = {
  input: PropTypes.string.isRequired
};

DisplayInput.defaultProps = {
  input: "not redux"
};

const mapStateToProps = state => {
  return { input: state.input };
};

export default connect(mapStateToProps)(DisplayInput);
