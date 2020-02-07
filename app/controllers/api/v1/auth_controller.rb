module Api::V1
  class AuthController < ApiController
    skip_before_action :authenticate_api!

    def login
      user = User.find_by(email: params[:email])
      if user&.valid_password?(params[:password])
        if is_mobile_call?
          render_success(user)
        else
          render_error('Not teacher!') and return if user.student?
          sign_in(user)
          render_success({})
        end
        return
      end
      render_error('Invalid email or password!', 401)
    end

    def logout
      current_user.ensure_authentication_token
      sign_out(current_user)
      render_success({})
    end
  end
end