module Api
  class ImagesController < ApplicationController
  
    def create
      @image = Image.new(image_params)
      if @image.save!
        render json: @image
      else
        render json: @image.errors.full_message, status: :unprocessable
      end
    end


    private
    def image_params
      params.require(:image).permit(:url, :piece_id)
    end
    
  end
end
