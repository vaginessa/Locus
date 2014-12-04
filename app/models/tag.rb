class Tag < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: true
  
  has_many :tag_units
  has_many :pieces, through: :tag_units
end
