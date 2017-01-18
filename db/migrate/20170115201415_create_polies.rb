class CreatePolies < ActiveRecord::Migration[5.0]
  def change
    create_table :polies do |t|
      t.string :name
      t.string :description
      t.string :repotype
      t.string :repourl

      t.timestamps
    end
  end
end
