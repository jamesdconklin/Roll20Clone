import React from 'react';
import Modal from 'react-modal';
import PlayerLink from './player_link';
import { Link } from 'react-router';
import UserSignupContainer from './user_signup_container';
import UserSignupStyle from './user_signup_style';
import { cloudinaryConfig, CloudinaryImage } from 'react-cloudinary';

class GameDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this._openModal = this._openModal.bind(this);
    this._onModalClose = this._onModalClose.bind(this);
  }

  _onModalClose() {
    this.setState({modalOpen: false});
  }

  _openModal() {
    this.setState({modalOpen: true});
  }

  _onModalOpen() {
  }

  _userLinks(game, user) {
    let edit, play;

    if (!user) {
      return "";
    }

    if (user.id === game.gm.id) {
      edit = (
        <Link className="button" to={`/games/${game.id}/edit`}>
          Edit Game
        </Link>
      );
    } else {
      edit = "";
    }

    if (game.players.map(p => p.id)
      .concat(game.gm.id).
        indexOf(user.id) >= 0) {
      play = (
        <Link className="button" to={`/canvas/${game.id}`}>
          Join Game
        </Link>
      );
    } else {
      play = "";
    }

    return (
      <div className="flex-around">
        {edit}
        <br/>
        {play}
      </div>
    );
  }

  render() {
    cloudinaryConfig({ cloud_name: window.cloudName });
    let { gameDetail, currentUser, enlist, deEnlist } = this.props;
    return (
      <section className="content center-horiz">
        <section className="content-center">
          <section className="game-detail-main">
            <Modal isOpen={this.state.modalOpen}
                   onRequestClose={this._onModalClose}
                   onAfterOpen={this._onModalOpen}
                   className="user-signup">
              <UserSignupContainer onModalClose={this._onModalClose}/>
            </Modal>
            <section className="flex-between">
              <div className="game-detail-img">
                <CloudinaryImage publicId={gameDetail.image_url}
                                 options={{quality: 30, width: 480, crop: "scale"}}/>
                {this._userLinks(gameDetail, currentUser)}
              </div>
              <div className="game-detail-body">
                <h1>{gameDetail.title}</h1>
                <div className="table-wrap">
                  <table>
                    <tbody>
                      <tr><th>GM: </th><td><Link to={`/users/${gameDetail.gm.id}`}>
                        {gameDetail.gm.username}
                      </Link></td></tr>
                      <tr><th>System: </th><td>{gameDetail.system}</td></tr>
                      <tr><th>Active: </th><td>{gameDetail.active ? "Yes" : "No"}</td></tr>
                      <tr><th>Description: </th><td>
                        {gameDetail.description.split(/\n|\r|\r\n/).map(
                          (p,i) => <p key={i}>{p}</p>
                        )}
                      </td></tr>
                      <tr>
                        <th>Players: </th>
                        <td>
                          {Object.keys(gameDetail.players).length}/{gameDetail.max_players || "--"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="game-detail-players">
                  <ul>
                    {Object.keys(gameDetail.players).map(
                      (key) => {
                        let player = gameDetail.players[key];
                        return (
                          <PlayerLink key={player.id} player={player}
                            gmId={gameDetail.gm.id} userId={currentUser && currentUser.id}
                            deEnlist={deEnlist(gameDetail.id, player.id)}/>
                        );
                      }
                    )}
                    {(currentUser && (currentUser.id === gameDetail.gm.id ||
                      gameDetail.players.map(p=>p.id).
                        indexOf(currentUser.id) < 0
                      )) ? (
                      <li key="plus">
                        <div className="player-link">
                          <a onClick={ (e) => {
                              e.preventDefault();
                              if (gameDetail.gm.id === currentUser.id) {
                                this._openModal();
                              } else {
                                enlist(gameDetail.id, currentUser.id)(e);
                              }
                            }
                          }
                             href="javascript.void()">
                            <div className="icon">
                              <div>
                                <span>+</span>
                              </div>
                            </div>
                          </a>
                      </div>
                      </li>
                    ) : ""}
                  </ul>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default GameDetail;
