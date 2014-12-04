class CreateTagUnits < ActiveRecord::Migration
  def change
    create_table :tag_units do |t|
      t.integer :tag_id, null: false
      t.integer :piece_id, null: false
      
      t.timestamps
    end
    
    add_index :tag_units, [:tag_id, :piece_id]
  end
end
