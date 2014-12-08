class Piece < ActiveRecord::Base
  
  validates :user_id, :media_type, presence: true
  
  belongs_to(
    :artist,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )
  
  has_many :followers, through: :artist, source: :followers
  
  has_many :tag_units
  has_many :tags, through: :tag_units, source: :piece

  has_one :image
  has_one :audio
  has_one :video
  
  has_one(
    :profile,
    class_name: 'Profile',
    foreign_key: :cover_piece_id,
    primary_key: :id
  )
  
  default_scope {
    order(updated_at: :desc);
  }
  
  def media=(media_params)
    if media_type == 'image'
      self.image = Image.new(url: media_params[:url])
    elsif media_type == 'audio'
      self.audio = Audio.new(url: media_params[:url])
    else
      self.video = Video.new(url: media_params[:url])
    end
  end
  
  def follow_unit(current_user_id)
    FollowUnit.find_by_ids(current_user_id, user_id)
  end
end