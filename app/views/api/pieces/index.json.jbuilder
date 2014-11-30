
json.current_user do 
  json.current_user_id @current_user.id
  json.fname @current_user.fname
  json.lname @current_user.lname
end


json.pieces(@pieces) do |piece|
  json.id piece.id
  json.title piece.title
  json.image piece.image
  json.artist_fname piece.artist.fname
  json.artist_lname piece.artist.lname
end




