class AddMediaTypeToPieces < ActiveRecord::Migration
  def change
    add_column :pieces, :media_type, :string
    change_column :pieces, :media_type, :string, null: false
  end
end
