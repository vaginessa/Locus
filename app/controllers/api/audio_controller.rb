module Api
  class AudioController < ApplicationController

    def create
      @audio = Audio.new(audio_params)
      if @audio.save!
        render json: @audio
      else
        render json: @audio.errors.full_message, status: :unprocessable
      end
    end
  
    private
    def audio_params
      params.require(:audio).permit(:url, :piece_id)
    end
    
  end
end


