module Api::V1
  class UsersController < ApiController
    def index
      render_success(User.order(:id))
    end
  end
end