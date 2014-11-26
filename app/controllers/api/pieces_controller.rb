module Api
  class PiecesController < ApplicationController
    
    def index
      @pieces = Piece.all
      @current_user = current_user
      render :index
    end
    
    private
    def piece_params
      params.require(:piece).permit(:title, :statement, :filepicker_url)
    end
  end
end
