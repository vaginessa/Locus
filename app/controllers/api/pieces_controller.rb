module Api
  class PiecesController < ApplicationController
    
    def index
      @pieces = Piece.all
      @current_user = current_user
      render :index
    end
    
    
    def create
      @piece = Piece.new()
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
      params.require(:piece).permit(:title, :statement)
    end
  end
end
