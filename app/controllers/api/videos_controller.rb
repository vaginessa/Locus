class VideosController < ApplicationController
  
  def new;end
  
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
    params.permit()
  end
end
