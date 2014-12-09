module Api
  class TagsController < ApplicationController
    
    def index
      @tags = Tag.all
    end
  
    def create
      @tag = Tag.new(tag_params)
      if @tag.save
        render :show
      else
        render json: @tag.errors.full_message, status: :unprocessable
      end
    end
  
    private
    def tag_params
      params.require(:tag).permit(:name)
    end
    
  end
end
