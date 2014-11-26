class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      
      t.string :title
      t.string :user_id
      t.string :filepicker_url
      t.string :statement

      t.timestamps
    end
    
    add_index :pieces, :user_id
  end
end
