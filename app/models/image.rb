class Image < ActiveRecord::Base
  validates :url, :piece_id, presence: true
  
  belongs_to :piece
end
