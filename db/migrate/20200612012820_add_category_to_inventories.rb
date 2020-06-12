class AddCategoryToInventories < ActiveRecord::Migration[6.0]
  def change
    add_column :inventories, :category, :string
  end
end
