class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :url, null: false
      t.integer :piece_id, null: false

      t.timestamps
    end
    
    add_index :videos, :url
  end
end
