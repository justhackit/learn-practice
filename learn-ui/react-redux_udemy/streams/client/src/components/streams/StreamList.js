import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderForOwned(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Stack spacing={2} direction="row">
            <Link to={`/streams/edit/${stream.id}`}>
              <Button variant="outlined">Edit</Button>
            </Link>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </Stack>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderForOwned(stream)}
          <i className="large middle icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new">
            <Button variant="contained">Create Stream</Button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.userAuth.userId,
    isSignedIn: state.userAuth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
