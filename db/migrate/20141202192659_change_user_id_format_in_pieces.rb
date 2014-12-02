class ChangeUserIdFormatInPieces < ActiveRecord::Migration
  def change
    remove_column :pieces, :user_id
    add_column :pieces, :user_id, :integer
    change_column :pieces, :user_id, :integer, null: false
  end
end
