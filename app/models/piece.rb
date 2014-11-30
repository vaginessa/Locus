class Piece < ActiveRecord::Base
  # attr_accessible :image
  validates :user_id, presence: true
  
  belongs_to(
    :artist,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )
  
  has_one :image
  
  has_many(
   :audio,
   class_name: 'Audio',
   foreign_key: :piece_id,
   primary_key: :id
  )
  
  has_many :videos
  
end