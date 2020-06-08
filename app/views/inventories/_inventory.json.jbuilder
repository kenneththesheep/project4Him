json.extract! inventory, :id, :name, :remarks, :total_quantity, :unsorted_quantity, :sorted_quantity, :image_url, :user_id, :created_at, :updated_at
json.url inventory_url(inventory, format: :json)
