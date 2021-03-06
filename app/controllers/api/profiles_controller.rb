module Api
  class ProfilesController < ApplicationController
    
    def show
      @profile = Profile.find(params[:id])
      @followed = followed_by_current_user?(@profile.user)
      @follow_unit_id = FollowUnit.find_by_ids(current_user.id, @profile.user.id)[0]
      
      if @follow_unit_id
        @follow_unit_id = @follow_unit_id.id
      end

      @cover_piece = @profile.cover_piece
      if @cover_piece
        @image = @cover_piece.image
        @audio = @cover_piece.audio
        @video = @cover_piece.video
      else
        @image = nil
        @audio = nil
        @video = nil
      end
      
      render :show
    end
    
    def update
      @profile = Profile.find(params[:id]);
      if @profile.update(profile_params)
        show
      else
        render json: @profile.errors.full_message, status: :unprocessable
      end
    end

    private
    def profile_params
      params.require(:profile).permit(:cover_piece_id, :artist_statement, :collaborative_statement)
    end
   
    def followed_by_current_user?(user)
      current_user.follows(user)
    end
    
  end
end
