module Api
  class MediaController < ApplicationController

    def create
      media_class = media_params.type
      @media = media_class.new(media_params)
      if @media.save!
        render json: @media
      else
        render json: @media.errors.full_message, status: :unprocessable
      end
    end
  
  end
end


