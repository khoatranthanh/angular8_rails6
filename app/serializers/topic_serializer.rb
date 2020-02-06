class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :questions

  def questions
    object.questions
  end
end
