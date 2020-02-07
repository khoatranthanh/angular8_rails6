class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :content, :correct

  self.root = false

  def correct
    object.correct.to_s
  end
end
