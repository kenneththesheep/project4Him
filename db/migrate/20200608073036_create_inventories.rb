class CreateInventories < ActiveRecord::Migration[6.0]
  def change
    create_table :inventories do |t|
      t.string :name
      t.text :remarks
      t.integer :total_quantity
      t.integer :unsorted_quantity
      t.integer :sorted_quantity
      t.string :image_url
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
