import React from "react";

import { connect } from "../my-redux";
import DisplayInput from "./display-input";
import { thunk } from "../actions";
import { getInput } from "../reducers";

class Home extends React.Component {
  static defaultProps = {
    input: "not redux"
  };
  render() {
    return (
      <div>
        {this.props.input.length > 3 ? (
          <div>
            <DisplayInput />
          </div>
        ) : null}
        {this.props.loading ? <div>Loading....</div> : null}
        <input value={this.props.input} onChange={this.props.onChange} />

        <div>
          <button onClick={this.props.hitTheNetwork}>hit the network</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    input: getInput(state),
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: e => dispatch({ type: "SET_INPUT", input: e.target.value }),
    hitTheNetwork: () => dispatch(thunk())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
