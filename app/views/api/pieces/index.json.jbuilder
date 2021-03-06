
json.current_user do 
  json.current_user_id @current_user.id
  json.fname @current_user.fname
  json.lname @current_user.lname
  json.profile_id @current_user.profile.id
end

json.pieces(@pieces) do |piece|
  json.updated_at piece.updated_at
  
  json.id piece.id
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




