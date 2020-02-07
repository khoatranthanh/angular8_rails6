class UserSerializer < ActiveModel::Serializer
  attributes :email, :name, :role

  self.root = false

  def role
    User.roles[object.role]
  end
end
