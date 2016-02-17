import React from "react";

import Table from "./Table";
import Pagination from "./Pagination";
import UserModal from "./UserModal";

var Index = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    users: React.PropTypes.object,
  },
  getInitialState: function() {
    return {
      showCreateModal: false,
      name: undefined,
      age: undefined,
      pageNumber: 0,
    };
  },
  componentDidMount: function() {
    // Empty search
    this.props.actions.searchUsers(undefined, undefined, 10, 0);
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.users && nextProps.users.needsRefresh &&
        nextProps.users.needsRefresh !== this.props.users.needsRefresh) {
      // Refresh! A bad way to do this since retrieving what we update from
      // the server and slicing the redux state would be much better, but this
      // is quick and dirty.
      this.props.actions.searchUsers(this.state.name,
                                     this.state.age,
                                     10,
                                     this.state.pageNumber * 10);
    }
  },
  onNameChanged: function(e) {
    var name = e.currentTarget.value;
    this.setState({
      name: name,
    });
  },
  onAgeChanged: function(e) {
    var age = e.currentTarget.value;
    this.setState({
      age: age,
    });
  },
  onSearchButtonClicked: function() {
    var age = this.state.age;
    var name = this.state.name;
    var pageNumber = this.state.pageNumber;
    this.props.actions.searchUsers(name, age, 10, pageNumber * 10);
  },
  onCreateUserClicked: function() {
    this.setState({showCreateModal: true});
  },
  onCreateModalHidden: function() {
    this.setState({
      showCreateModal: false,
    });
  },
  onPageNumberUpdated: function(newPageNumber) {
    var age = this.state.age;
    var name = this.state.name;
    this.props.actions.searchUsers(name, age, 10, newPageNumber * 10);
    this.setState({pageNumber: newPageNumber});
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 col-xs-2">
            <button className="btn btn-block btn-default"
                    onClick={this.onCreateUserClicked}>
              Create User
            </button>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-md-4 col-xs-4">
            <input type="text"
                     className="form-control"
                     placeholder="Name"
                     value={this.state.name}
                     onChange={this.onNameChanged}/>
          </div>
          <div className="col-md-4 col-xs-4">
            <input type="text"
                     className="form-control"
                     placeholder="Age"
                     value={this.state.age}
                     onChange={this.onAgeChanged}/>
          </div>
          <div className="col-md-4 col-xs-4">
            <button className="btn btn-block btn-default"
                    onClick={this.onSearchButtonClicked}>
              Search
            </button>
          </div>
        </div>
        <Pagination users={this.props.users}
                    onPageNumberUpdated={this.onPageNumberUpdated}
                    pageNumber={this.state.pageNumber}/>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <Table actions={this.props.actions}
                   users={this.props.users}/>
          </div>
        </div>
        <UserModal show={this.state.showCreateModal}
                   onModalHidden={this.onCreateModalHidden}
                   actions={this.props.actions}/>
      </div>
    );
  },
});

module.exports = Index;
