class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.boolean :collaborate, null: false
      
      t.timestamps
    end
    
    add_index :users, :email
    add_index :users, :session_token
  end
  

end
