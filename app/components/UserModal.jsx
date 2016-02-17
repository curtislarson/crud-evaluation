import React from "react";

import Modal from "react-bootstrap-modal";

var ModalWrapper = React.createClass({
  propTypes: {
    show: React.PropTypes.bool,
    onModalHidden: React.PropTypes.func,
    user: React.PropTypes.object,
    actions: React.PropTypes.object,
  },
  getInitialState: function() {
    return {
      _id: null, // helpful in determining if we are editing or not
      name: null,
      age: null,
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.user) {
      var user = nextProps.user;
      this.setState({
        name: user.name,
        age: user.age,
        _id: user._id,
      });
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
  onSaveClicked: function() {
    // Basic verification
    if (this.state.age && this.state.name) {
      if (this.state._id) {
        // Edit
        this.props.actions.editUser(this.state._id,
                                    this.state.name,
                                    this.state.age);
      }
      else {
        // Create
        this.props.actions.createUser(this.state.name, this.state.age);
      }
    }
    this.props.onModalHidden();
  },
  render: function() {
    return (
      <Modal show={this.props.show}
             onHide={this.props.onModalHidden}
             aria-labelledby="ModalHeader">
        <Modal.Body>
          <div className="row form-group">
            <div className="col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1">
              <input type="text"
                     className="form-control"
                     placeholder="Name"
                     value={this.state.name}
                     onChange={this.onNameChanged}/>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1">
              <input type="text"
                     className="form-control"
                     placeholder="Age"
                     value={this.state.age}
                     onChange={this.onAgeChanged}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-xs-4">
              <button className="btn btn-block btn-success"
                      onClick={this.onSaveClicked}>
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
});

module.exports = ModalWrapper;
