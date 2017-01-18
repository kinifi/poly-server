class AddReadMeToPoly < ActiveRecord::Migration[5.0]

  create_table :users do |t|
      t.string :name
      t.string :email
      t.string :author
      t.string :owner
      t.string :homepage
      t.string :bugtracker
      t.string :license

      t.timestamps
    end
end
