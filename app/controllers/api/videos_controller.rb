module Api
  class VideosController < ApplicationController
  
    def create
      @video = Video.new(video_params)
      if @video.save!
        render json: @video
      else
        render json: @video.errors.full_message, status: :unprocessable
      end
    end
  
    private
    def video_params
      params.require(:video).permit(:url, :piece_id)
    end
    
  end
end
