class RemoveStatusFromInventories < ActiveRecord::Migration[6.0]
  def change
    remove_column :inventories, :status, :string
  end
end
