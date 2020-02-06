class TopicSerializer < ActiveModel::Serializer
  attributes :name, :description, :questions

  def questions
    object.questions
  end
end
