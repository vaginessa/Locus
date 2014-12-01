class AddPieceIdToAudios < ActiveRecord::Migration
  def change
    add_column :audios, :piece_id, :integer
    change_column :audios, :piece_id, :integer, null: false
  end
end
