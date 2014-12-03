module Api
  class ProfilesController < ApplicationController
    
    def show
      @profile = Profile.find(params[:id])
      render :show
    end
    
    def update
      @profile = Profile.find(params[:id]);
      if @profile.update(profile_params)
        render json: @profile
      else
        render json: @profile.errors.full_message, status: :unprocessable
      end
    end

    private
    def profile_params
      params.require(:profile).permit(:cover_piece_id, :artist_statement, :collaborative_statement)
    end
  end
end
