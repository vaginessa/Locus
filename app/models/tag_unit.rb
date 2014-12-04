class TagUnit < ActiveRecord::Base
  validates :tag_id, :piece_id, presence: true
  validates [:tag_id, :piece_id], uniqueness: true
  
  belongs_to :tag
  belongs_to :piece
end
