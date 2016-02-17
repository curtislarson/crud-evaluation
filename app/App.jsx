import React from "react";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

import Index from "./components/Index";

import * as actions from "./actions";

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
    actions: React.PropTypes.object,
    users: React.PropTypes.object,
  },
  render: function() {
    var children = this.props.children || <Index/>;
    if (children) {
      var _this = this;
      children = React.Children.map(children, function(child) {
        return React.cloneElement(child, {
          actions: _this.props.actions,
          users: _this.props.users,
        });
      });
    }
    return (
      <div>
        {children}
      </div>
    );
  },
});

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
