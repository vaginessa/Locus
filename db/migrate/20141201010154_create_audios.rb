class CreateAudios < ActiveRecord::Migration
  def change
    create_table :audios do |t|
      t.string :url, null: false
      t.integer :piece_id, null: false

      t.timestamps
    end
    
    add_index :audios, :url
  end
end
