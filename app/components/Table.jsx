import React from "react";

import UserModal from "./UserModal";

var Table = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    users: React.PropTypes.object,
  },
  getInitialState: function() {
    return {
      showEditModal: false,
      editUser: null,
    };
  },
  onEditUser: function(user) {
    this.setState({
      showEditModal: true,
      editUser: user,
    });
  },
  onEditModalHidden: function() {
    this.setState({
      showEditModal: false,
      editUser: null,
    });
  },

  onDeleteUser: function(user) {
    // No confirmation dialog for us at the moment.
    this.props.actions.deleteUser(user._id);
  },
  render: function() {
    var tbody = this.constructTableBody(this.props.users);
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
        <UserModal show={this.state.showEditModal}
                   onModalHidden={this.onEditModalHidden}
                   user={this.state.editUser}
                   actions={this.props.actions}/>
      </div>
    );
  },
  constructTableBody: function(users) {
    var tbody = [];
    if (users && users.users.users) {
      var _this = this;
      users.users.users.forEach(function(user) {
        tbody.push(
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>
              <a href="#"
                 onClick={_this.onEditUser.bind(_this, user)}>
                 <i className="fa fa-edit"></i>
              </a>
              &nbsp;|&nbsp;
              <a href="#"
                 onClick={_this.onDeleteUser.bind(_this, user)}>
                 <i className="fa fa-close"></i>
              </a>
            </td>
          </tr>
        );
      });
    }
    return tbody;
  }
});

module.exports = Table;
