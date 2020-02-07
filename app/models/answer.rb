class Answer < ApplicationRecord
  belongs_to :question

  validates :content, presence: true
  validates :question_id, uniqueness: { scope: :correct }

  has_many :user_answers
end
