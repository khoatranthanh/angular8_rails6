class Answer < ApplicationRecord
  belongs_to :question

  validates :content, presence: true
  validates :question_id, uniqueness: { scope: :correct }
end
