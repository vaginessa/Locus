json.current_user(current_user, :id)

json.array!(current_user.followees)
json.array!(current_user.followers)