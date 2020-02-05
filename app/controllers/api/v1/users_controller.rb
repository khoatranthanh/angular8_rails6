module Api::V1
  class UsersController < ApiController
    def index
      render_success(User.order(:id))
    end

    def roles
      render_success(User.roles)
    end

    def create
      user = User.new(user_params)
      if user.save
        render_success({})
        return
      end
      render_error(user.errors.full_messages.first)
    end

    private
    def user_params
      params.permit(:name, :email, :role, :password, :password_confirmation)
    end
  end
end