import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const Context = React.createContext();

export function Provider(props) {
  return (
    <Context.Provider value={props.store}>{props.children}</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired
};

export const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) => {
  return YourComponent => {
    class HOC extends React.Component {
      static contextType = Context;
      state = {
        id: shortid.generate()
      };
      mapState = () => {
        return mapStateToProps(this.context.getState());
      };

      mapDispatch = () => {
        return mapDispatchToProps(this.context.dispatch);
      };

      componentDidMount() {
        this.context.subscribe(() => this.forceUpdate(), this.state.id);
      }
      componentWillUnmount() {
        this.context.unsubscribe(this.state.id);
      }
      render() {
        return (
          <YourComponent
            {...this.props}
            {...this.mapState()}
            {...this.mapDispatch()}
          />
        );
      }
    }
    return HOC;
  };
};
export const createStore = (reducer, initialState) => {
  let state = initialState;
  const getState = () => state;
  const subscriptions = {};

  const subscribe = (callback, id) => {
    subscriptions[id] = callback;
  };
  const unsubscribe = id => {
    delete subscriptions[id];
  };
  const dispatch = action => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      state = reducer(state, action);
      Object.values(subscriptions).forEach(cb => cb());
    }
  };
  return {
    getState,
    dispatch,
    subscribe,
    unsubscribe
  };
};
