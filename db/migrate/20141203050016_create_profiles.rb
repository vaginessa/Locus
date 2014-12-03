class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false
      t.integer :cover_piece_id
      t.text :artist_statement
      t.text :collaborative_statement

      t.timestamps
    end
    add_index :profiles, :user_id
  end
end
