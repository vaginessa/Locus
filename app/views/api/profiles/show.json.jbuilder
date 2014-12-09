json.profile do 
  json.current_user_id current_user.id
  json.user do
    json.user_id @profile.user_id
    json.user_fname @profile.user.fname
    json.user_lname @profile.user.lname
  end
  json.cover_piece do
    json.c_p @profile.cover_piece
    json.c_p_img @image
    json.c_p_aud @audio
    json.c_p_vid @video
  end
  @profile.cover_piece
  json.artist_statement @profile.artist_statement
  json.created_at @profile.created_at
end

