class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :answers

  self.root = false

  def answers
    object.answers.map { |answer| AnswerSerializer.new(answer) }
  end
end
