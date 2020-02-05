class UserSerializer < ActiveModel::Serializer
  attributes :email, :name, :role

  def role
    User.roles[object.role]
  end
end
