class TagUnit < ActiveRecord::Base
  validates :tag_id, :piece_id, presence: true
  validates_uniqueness_of :tag_id, scope: [:piece_id]
  
  belongs_to :tag
  belongs_to :piece
end
