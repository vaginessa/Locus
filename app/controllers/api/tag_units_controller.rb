module Api
  class TagUnitsController < ApplicationController
    
    def create
      @tag_unit = TagUnit.new(tag_unit_params)
      if @tag_unit.save!
        render :show
      else
        render json: @tag_unit.errors.full_message, status: :unprocessable
      end
    end
    
    private
    def tag_params
      params.require(:tag_unit).permit(:piece_id, :tag_id)
    end
    
  end
end
