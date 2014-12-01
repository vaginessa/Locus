class ChangeStatementFormatInPieces < ActiveRecord::Migration
  def change 
    change_column :pieces, :statement, :text
  end
end
