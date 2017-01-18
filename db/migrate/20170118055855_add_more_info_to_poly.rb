class AddMoreInfoToPoly < ActiveRecord::Migration[5.0]
  def change
    add_column :polies, :author, :string
    add_column :polies, :website, :string
    add_column :polies, :bugsurl, :string
    add_column :polies, :license, :string
  end
end
