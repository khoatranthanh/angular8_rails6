class CreateUserAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :user_answers do |t|
      t.references :user
      t.references :answer

      t.timestamps
    end
  end
end
