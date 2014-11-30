class RemoveFilePickerUrlFromPieces < ActiveRecord::Migration
  def change
    remove_column :pieces, :filepicker_url
  end
end
