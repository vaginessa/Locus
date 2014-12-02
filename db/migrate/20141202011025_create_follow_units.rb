class CreateFollowUnits < ActiveRecord::Migration
  def change
    create_table :follow_units do |t|
      t.integer :follower_id, null: false
      t.integer :followee_id, null: false

      t.timestamps
    end
    add_index :follow_units, [:follower_id, :followee_id]
  end
end
