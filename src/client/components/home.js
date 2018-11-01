import React from "react";
import PropTypes from "prop-types";

import DisplayInput from "./display-input";
import { connect } from "../my-redux";
import { fetchSomething } from "../actions/fetch-something";

class Home extends React.Component {
  static propTypes = {
    input: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchSomething: PropTypes.func.isRequired
  };
  static defaultProps = {
    input: "not redux"
  };
  render() {
    return (
      <div>
        {this.props.loading ? <div>loading.... </div> : null}
        {this.props.input.length > 3 ? <DisplayInput /> : null}
        <br />
        <input value={this.props.input} onChange={this.props.onChange} />
        <button onClick={this.props.fetchSomething}>fetch something!</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { input: state.input, loading: state.loading };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: e => dispatch({ type: "SET_INPUT", input: e.target.value }),
    fetchSomething: () => dispatch(fetchSomething())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
