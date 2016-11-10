import React from 'react';
import { connect } from 'react-redux';

import { receiveMessage, postMessage, requestMessages }
  from '../../actions/message_actions';

import Messages from './messages';

const mapStateToProps = state => ({
  messages: state.messages,
  userId: state.session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  postMessage: (gameId, message) => dispatch(postMessage(gameId, message)),
  requestMessages: (gameId) => dispatch(requestMessages(gameId)),
  receiveMessage: (message) => dispatch(receiveMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
