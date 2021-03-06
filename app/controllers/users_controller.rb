class UsersController < ApplicationController
  
  def new; end

  def show;end
  
  def index
    @users = filter_index
    render :json => @users.to_json(only: [:id, :fname, :lname], include: [:profile])
  end
  
  def create
    @user = User.new(user_params);
    if @user.save
      profile = Profile.new();
      profile.user_id = @user.id
      profile.save!
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update!(user_params)
      render json: @user
    else
        flash.now[:errors] = @user.errors.full_messages
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:email, :fname, :lname, :password, :collaborate)
  end
  
  def filter_index
    f = params[:filter]
    if f == 'followers'
      current_user.followers
    elsif f == 'following'
      current_user.followees
    else
      User.all
    end
  end
  
end
