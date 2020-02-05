module Api::V1
  class AuthController < ApiController
    skip_before_action :authenticate_api!

    def login
      user = User.find_by(email: params[:email])
      if user&.valid_password?(params[:password])
        sign_in user
        render json: {
          status: 200,
          result: {
            token: user.authentication_token
          }
        } and return
      end
      render json: {
        status: 401,
        message: 'Invalid email or password!'
      }
    end
  end
end