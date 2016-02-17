import React from "react";

var Pagination = React.createClass({
  propTypes: {
    users: React.PropTypes.object,
    onPageNumberUpdated: React.PropTypes.func,
    pageNumber: React.PropTypes.number,
  },
  onPaginateBackwards: function() {
    this.props.onPageNumberUpdated(this.props.pageNumber - 1);
  },
  onPaginateForwards: function() {
    this.props.onPageNumberUpdated(this.props.pageNumber + 1);
  },
  render: function() {
    var previousPage;
    var nextPage;
    var userData = this.props.users.users;
    var numTotalUsers = userData.count;
    var numCurrentUsers = 0;
    if (userData.users) {
      numCurrentUsers = this.props.users.users.users.length;
    }
    var numCurrentUsersMax = this.props.pageNumber * 10 + 10;
    if (numCurrentUsersMax > numTotalUsers) {
      numCurrentUsersMax = numTotalUsers;
    }

    if (this.props.pageNumber !== 0) {
      previousPage = (
        <i className="fa fa-2x fa-backward pointer"
           onClick={this.onPaginateBackwards}></i>
      );
    }
    if (numCurrentUsers !== numTotalUsers) {
      nextPage = (
        <i className="fa fa-2x fa-forward pointer"
           onClick={this.onPaginateForwards}></i>
      );
    }

    return (
      <div className="row">
        <div className="col-md-2 col-xs-2">
          {previousPage}
        </div>
        <div className="col-md-8 col-xs-8 text-center">
          <h3>Displaying users {this.props.pageNumber * 10 + 1} - {numCurrentUsersMax} of {numTotalUsers}</h3>
        </div>
        <div className="col-md-2 col-xs-2">
          {nextPage}
        </div>
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

module.exports = Pagination;
