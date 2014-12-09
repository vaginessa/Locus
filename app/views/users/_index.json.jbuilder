json.users(@users) do |user|
  json.id user.id
  json.profile_id user.profile.id
  json.fname user.fname
  json.lname user.lname
end