class AddStatusToInventories < ActiveRecord::Migration[6.0]
  def change
    add_column :inventories, :status, :string
  end
end