import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "986696403630-p0mfutqn767511rrtqb8teae9njm4d7v.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "streamy_blah_blah",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClicked = () => {
    this.auth.signIn();
  };

  onSignOutClicked = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isUserSignedIn === null) {
      return null;
    } else if (this.props.isUserSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignOutClicked}
        >
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button
          className="ui green google button"
          onClick={this.onSignInClicked}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isUserSignedIn: state.userAuth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
