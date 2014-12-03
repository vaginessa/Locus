json.profile do 
  json.current_user_id current_user.id
  json.user do
    json.user_id @profile.user_id
    json.user_fname @profile.user.fname
    json.user_lname @profile.user.lname
    json.collaborate @profile.user.collaborate
  end
  json.follows @followed
  json.follow_unit_id @follow_unit_id
  json.cover_piece @profile.cover_piece
  json.artist_statement @profile.artist_statement
  json.collaborative_statement @profile.collaborative_statement
  json.created_at @profile.created_at
end

