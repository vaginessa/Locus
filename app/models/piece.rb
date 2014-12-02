class Piece < ActiveRecord::Base
  # attr_accessible :image
  validates :user_id, :media_type, presence: true
  
  belongs_to(
    :artist,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )
  
  has_one :image
  
  has_one :audio
  
  has_one :video
  
  default_scope {
    order(updated_at: :desc);
  }
  
  def media=(media_params)
    if media_type == 'image'
      self.image = Image.new(url: media_params[:url])
    end
  end
end