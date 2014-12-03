json.profile do 
  json.user do
    json.user_id @profile.user.id
    json.user_fname @profile.user.fname
    json.user_lname @profile.user.lname
    json.colloborate @profile.user.collaborate
  end
  json.cover_piece @profile.cover_piece
  json.artist_statement @profile.artist_statement
  json.collaborative_statement @profile.collaborative_statement
  json.created_at @profile.created_at
end

