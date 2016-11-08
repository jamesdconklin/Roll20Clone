class Api::CanvasController < ApplicationController
  # before_action: require_login
  def show
    game = Game.find_by(id: params[:game_id])
    if game
      render json: JSON.parse(game.canvas_state)
    else
      render json: ["Game not found by given id"],
             status: 422
    end
  end

  def update
    game = Game.find_by(id: params[:game_id])
    if game
      delta = canvas_params
      layer = params[:layer]
      state = JSON.parse(game.canvas_state)
      layer_state = state[layer]
      layer_state.each.with_index do |obj, idx|
        # debugger
        if obj["id"] == delta[:id]
          layer_state.delete(obj)
          delta = obj.merge(delta)
        end
      end
      layer_state.push(delta)
      state[layer] = layer_state
      if game.update(canvas_state: JSON.dump(state))
        render json: state
      else
        render status: 422, json: game.errors.full_messages
      end
    else
      render json: ["Game not found by given id"],
             status: 422
    end
  end

  private

  def canvas_params
    # debugger
    params.require(:delta).permit(
      :id, :class, :width, :height, :lineColor,
      :lineWidth, :fillColor, pos: []
    )
  end

end
