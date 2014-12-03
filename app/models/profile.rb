class Profile < ActiveRecord::Base
  validates :user_id, presence: true, uniqueness: true
  
  belongs_to :user
  belongs_to(
    :cover_piece,
    class_name: 'Piece',
    foreign_key: :cover_piece_id,
    primary_key: :id
  )
end
