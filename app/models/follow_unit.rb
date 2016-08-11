class FollowUnit < ActiveRecord::Base
  validates :follower_id, :followee_id, presence: true
  validates :follower_id, uniqueness: { scope: :followee_id }
  
  belongs_to(
    :follower,
    class_name: 'User',
    foreign_key: :follower_id,
    primary_key: :id
  )
  
  belongs_to(
    :followee,
    class_name: 'User',
    foreign_key: :followee_id,
    primary_key: :id
  )

  def self.find_by_ids(follower_id, followee_id)
    FollowUnit.find_by_sql([
      'SELECT * FROM follow_units WHERE follower_id = ? AND followee_id = ?',
      follower_id,
      followee_id
    ])
  end
end
