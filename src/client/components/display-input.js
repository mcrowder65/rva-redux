import React from "react";
import PropTypes from "prop-types";
import { connect } from "../my-redux";
import { getInput } from "../reducers";

const DisplayInput = props => {
  return props.input;
};

const mapStateToProps = state => {
  return {
    input: getInput(state)
  };
};

export default connect(mapStateToProps)(DisplayInput);
