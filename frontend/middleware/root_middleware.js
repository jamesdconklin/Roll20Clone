import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import GameListMiddleware from './game_list_middleware';
import GameDetailMiddleware from './game_detail_middleware';
import CanvasMiddleware from './canvas_middleware';
import AssetMiddleware from './asset_middleware';
import MessageMiddleware from './message_middleware';

export default applyMiddleware(
  SessionMiddleware,
  GameListMiddleware,
  GameDetailMiddleware,
  CanvasMiddleware,
  AssetMiddleware,
  MessageMiddleware
);
