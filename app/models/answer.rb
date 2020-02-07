class Answer < ApplicationRecord
  belongs_to :question

  validates :content, presence: true
  validate :only_one_answer_correct

  has_many :user_answers

  def only_one_answer_correct
    return if correct != true
    correct_answers = question.answers.where(correct: true)
    if persisted?
      correct_answers = correct_answers.where('id != ?', id)
    end
    if correct_answers.exists?
      errors.add(:question, 'cannot have another correct answer')
    end
  end
end
