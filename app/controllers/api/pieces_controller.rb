module Api
  class PiecesController < ApplicationController
    wrap_parameters :piece, include: [:media, :title, :media_type, :statement]
    
    def index
      @pieces = Piece.all
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
  end
end
