class AddUrlToAudios < ActiveRecord::Migration
  def change
    add_column :audios, :url, :string
    change_column :audios, :url, :string, null: false
  end
end
