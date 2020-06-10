class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :status
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :inventory, null: false, foreign_key: true

      t.timestamps
    end
  end
end
