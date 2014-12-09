class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true, uniqueness: true
  validates :fname, presence: true
  
  after_initialize :ensure_session_token
  
  has_one :profile
  
  has_many(
    :pieces,
    class_name: 'Piece',
    foreign_key: :user_id,
    primary_key: :id
  )
  
  has_many(
    :following_units,
    class_name: 'FollowUnit',
    foreign_key: :follower_id,
    primary_key: :id
  )
  
  has_many(
    :followed_units,
    class_name: 'FollowUnit',
    foreign_key: :followee_id,
    primary_key: :id
  )
  
  has_many :followers, through: :followed_units, source: :follower
  has_many :followees, through: :following_units, source: :followee
  has_many :followed_pieces, through: :followees, source: :pieces
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
  
  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    return nil if @user.nil?
    @user.is_password?(password) ? @user : nil
  end
  
  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
