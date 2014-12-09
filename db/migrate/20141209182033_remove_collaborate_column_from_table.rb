class RemoveCollaborateColumnFromTable < ActiveRecord::Migration
  def change
    remove_column :users, :collaborate
  end
end
