class Image < ActiveRecord::Base
  validates :url, :piece, presence: true
  
  belongs_to :piece, inverse_of: :image
end
