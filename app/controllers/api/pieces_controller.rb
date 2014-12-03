module Api
  class PiecesController < ApplicationController
    wrap_parameters :piece, include: [:media, :title, :media_type, :statement]
    
    def index
      @pieces = filter_index
      @current_user = current_user
      render :index
    end
    
    def show
      @piece = Piece.find(params[:id])
      render json: @piece
    end
    
    
    def create
      @piece = Piece.new(piece_params)
      @piece.user_id = current_user.id
      if @piece.save!
        render :show
      else
        render json: @piece.errors.full_message, status: :unprocessable
      end
    end
    
    def update
      @piece = Piece.find(params[:id])
      if @piece.update(piece_params)
        render json: @piece
      else
        render json: @piece.errors.full_messages, status: :unprocessable
      end

    end
    
    private
    
    def piece_params
      params.require(:piece).permit(:title, :statement, :media_type, media: [:url])
    end
    
    def filter_index
      f = params[:filter]
      if f == 'feed'
        Piece.find_by_sql([
          "SELECT pieces.*
          FROM pieces LEFT OUTER JOIN follow_units ON pieces.user_id = follow_units.followee_id
          WHERE follow_units.follower_id = ? OR pieces.user_id = ? ORDER BY pieces.updated_at DESC",
          current_user.id,
          current_user.id
        ])
      elsif f == 'search'
        return Piece.all
      elsif f == 'own'
        result = []
        return result << Piece.find_by_user_id(current_user.id)
      elsif f == 'random'
        Piece.find_by_sql([
          "SELECT pieces.*
          FROM pieces LEFT OUTER JOIN follow_units ON pieces.user_id = follow_units.followee_id
          WHERE (follow_units.follower_id != ? OR follow_units.follower_id is null) AND pieces.user_id != ? ORDER BY pieces.updated_at DESC, RANDOM()
          LIMIT 100",
          current_user.id,
          current_user.id
        ])
      end
    end
    
  end
end
