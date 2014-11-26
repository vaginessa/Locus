class Piece < ActiveRecord::Base
  validates :user_id, presence: true
  
  belongs_to(
    :artist,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )
  
end