class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :questions

  self.root = false

  def questions
    object.questions.map { |question| QuestionSerializer.new(question) }
  end
end
