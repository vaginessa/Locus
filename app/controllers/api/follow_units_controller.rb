module Api
  
  class FollowUnitsController < ApplicationController
    def new;end
    
    def create
      @follow_unit = FollowUnit.new(follow_unit_params)
      @follow_unit.follower_id = current_user.id
      if @follow_unit.save!
        render json: @follow_unit
      else
        render json: @follow_unit.errors.full_messages, status: :unprocessable
      end
    end
  end
  
  private
  def follow_unit_params
    params.require(:follow_unit).permit(:followee_id)
  end
  
end