class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.string :description
      t.references :topic

      t.timestamps
    end
  end
end
