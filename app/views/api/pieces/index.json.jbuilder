
json.current_user do 
  json.current_user_id @current_user.id
  json.fname @current_user.fname
  json.lname @current_user.lname
  json.profile_id @current_user.profile.id
  
  json.following_units(@current_user.following_units) do |following_unit|
    json.unit_id following_unit.id
  end
  
  json.followees(@current_user.followees) do |followee|
    json.followee_id followee.id
  end
  
  json.followers(@current_user.followers) do |follower|
    json.follower_id follower.id
  end
end


json.pieces(@pieces) do |piece|
  json.updated_at piece.updated_at
  
  json.id piece.id
  json.follow_unit piece.follow_unit(@current_user.id)
  json.title piece.title
  json.media_type piece.media_type
  json.image piece.image
  json.audio piece.audio
  json.video piece.video
  json.statement piece.statement
  json.artist_id piece.artist.id
  json.artist_fname piece.artist.fname
  json.artist_lname piece.artist.lname
  json.profile_id piece.artist.profile.id
end




