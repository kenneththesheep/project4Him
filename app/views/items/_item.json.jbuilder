json.extract! item, :id, :status, :user_id, :inventory_id, :created_at, :updated_at
json.url item_url(item, format: :json)
