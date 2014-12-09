class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password]);
    if @user
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end
  
  def destroy
    logout!
  end
end
