class AddReadMeToPoly < ActiveRecord::Migration[5.0]

  create_table :polies do |t|
      t.string :name
      t.string :description
      t.string :repotype
      t.string :repourl
      t.string :author
      t.string :owner
      t.string :homepage
      t.string :bugtracker
      t.string :license

      t.timestamps
    end
end
